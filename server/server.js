const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const { ObjectId } = require('mongodb');

// Connect DB 
let db;

async function connectToDb() {
    try {
        const url = 'mongodb://localhost/assignment3db';
        const client = new MongoClient(url, { useNewUrlParser: true });
        await client.connect();
        console.log('Connected to MongoDB at', url);
        db = client.db();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const resolvers = {
    Query: {
        getUserProfile: getUserProfileResolver,
        getAllQuestions: getAllQuestionsResolver,
        getUserQuestions: getUserQuestionsResolver,
    },
    Mutation: {
        signUpUser: signUpUserResolver,
        updateUserProfile: updateUserProfileResolver,
        deregisterUser: deregisterUserResolver,
        addQuestion: addQuestionResolver,
        deleteQuestion: deleteQuestionResolver,
        updateQuestion: updateQuestionResolver,
    }
};

// Queries

async function getUserProfileResolver(_, { email }) {
    try {
        const user = await db.collection('users').findOne({ email: email });
        if (user) {
            user.userId = user._id.toString(); 
            delete user._id;
        }
        return user;
    } catch (error) {
        console.error("Error getting user", error);
    }
}


async function getAllQuestionsResolver() {
    try {
        const questions = await db.collection('questions').find().toArray();
        questions.forEach(question => {
            question.questionId = question._id;
            delete question._id;
    });
        return questions;
    } catch (error) {
        console.error("Error getting all questions", error);
    }
}

async function getUserQuestionsResolver(_, { userId }) {
    const questions = await db.collection('questions').find({ userId: new ObjectId(userId) }).toArray();
    console.log(questions)
    questions.forEach(question => {
        question.questionId = question._id;
        delete question._id;
    });
    return questions;
}


// Mutations

async function signUpUserResolver(_, { name, email }) {
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists.');
    }
    const newUser = { name, email };
    const result = await db.collection('users').insertOne(newUser);
    
    if (!result.acknowledged) {
        throw new Error('Failed to insert the new user.');
    }
    
    return {
        userId: result.insertedId.toString(),
        name: name,
        email: email
    };
};

async function updateUserProfileResolver(_, { userId, name }) {
    const updatedUser = await db.collection('users').findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: { name } },
        { returnOriginal: false }
    );
    if (updatedUser) {
        updatedUser.userId = updatedUser._id.toString(); 
        delete updatedUser._id;
    }
    return updatedUser;    
}

async function deregisterUserResolver(_, { userId }) {
    const result =  await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
    if (!result.acknowledged) {
        throw new Error('Failed to delete user.');
    }
    return userId
}


async function addQuestionResolver(_, { userId, title, description, type, complexity }) {
    const question = {
        userId: new ObjectId(userId),
        title,
        description,
        type,
        complexity,
    };
    const result = await db.collection('questions').insertOne(question);
    if (result.acknowledged) {
        question.questionId = result.insertedId.toString();
        return question;
    } else {
        throw new Error('Failed to add question.');
    }
}

async function updateQuestionResolver(_, { questionId, title, description, type, complexity }) {
    const updatedQuestion = await db.collection('questions').findOneAndUpdate(
        { _id: new ObjectId(questionId) },
        { $set: { title, description, type, complexity } }, 
        { returnOriginal: false }
    );

    return updatedQuestion.value;
    
}

async function deleteQuestionResolver(_, { questionId }) {
    
    const result = await db.collection('questions').deleteOne({ _id: new ObjectId(questionId) });
    if (result.acknowledged) {
        return questionId;  
    } else {
        throw new Error('Failed to delete question.');
    }
}
  
// Graph QL
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});


// Serve React build folder
app.use(express.static(path.join(__dirname, '../build')));

// Serve React's index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Starting the server
(async function() {
    try {
        await server.start();
        
        server.applyMiddleware({ app, path: '/graphql' });

        await connectToDb();
        app.listen(3000, function() {
            console.log('App started on port 3000');
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();