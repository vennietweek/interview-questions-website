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

// Query Resolvers
async function getUserProfileResolver(_, { id }) {
    const user = await db.collection('users').findOne({ id });
    return user;
}

async function getAllQuestionsResolver() {
    const questions = await db.collection('questions').find().toArray();
    return questions;
}

async function getUserQuestionsResolver(_, { userId }) {
    const questions = await db.collection('questions').find({ userId }).toArray();
    return questions;
}

// Mutation Resolvers
async function signUpUserResolver(_, args) {
    try {
      const { name, email} = args;
      console.log(name, email);
      // Check if the user with the provided email already exists
      const existingUser = await db.collection('users').findOne({ email });
      
      if (existingUser) {
        throw new Error('User with this email already exists.');
      }
  
      // Create a new user document
      const newUser = {
        id: await db.collection('users').countDocuments() + 1,
        name,
        email,
      };
  
      // Insert the new user into the "users" collection
      const result = await db.collection('users').insertOne(newUser);
  
      // Get the inserted user document
      const insertedUser = result.ops[0];
      console.log(insertedUser);
      return insertedUser;
    } catch (error) {
      throw new Error(`Error signing up user: ${error.message}`);
    }
}

async function updateUserProfileResolver(_, { name, email }) {
    const updatedUser = await db.collection('users').findOneAndUpdate(
        { email },
        { $set: { name, email } },
        { returnOriginal: false }
    );
    return updatedUser.value;
}

async function deregisterUserResolver(_, args, context) {
    const { userId } = context;
    await db.collection('users').deleteOne({ id: userId });
    return userId;  
}

async function addQuestionResolver(_, { title, description, complexity }) {
    const question = {
        title,
        description,
        complexity,
    };
    const result = await db.collection('questions').insertOne(question);
    return result.ops[0];
}

async function deleteQuestionResolver(_, { id }) {
    await db.collection('questions').deleteOne({ questionId: id });
    return id;  
}

async function updateQuestionResolver(_, { id, title, description, complexity }) {
    const updatedQuestion = await db.collection('questions').findOneAndUpdate(
        { questionId: id },
        { $set: { title, description, complexity } },
        { returnOriginal: false }
    );
    return updatedQuestion.value;
}

module.exports = resolvers;

