const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const resolvers = require('./resolvers.js');
const path = require('path');
const app = express();

/******************************************* 
DATABASE CONNECTION CODE
********************************************/
let db;

async function connectToDb() {
    const url = 'mongodb://localhost/assignment3db';
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
}

/******************************************* 
GraphQL CODE
********************************************/  
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

//Attach Apollo to your Express app
server.applyMiddleware({ app, path: '/graphql' });

//Serve React build folder
app.use(express.static(path.join(__dirname, '../build')));

//Serve React's index.html for all other routes, so that routing is handled by React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//Starting the server
(async function() {
    try {
        await connectToDb();
        app.listen(3000, function() {
            console.log('App started on port 3000');
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();
