// initmongo.js

//To execute:
//$mongo assignment3db initmongo.js 
//Above command to be executed from the directory where initmongo.js is present

//Perform a cleanup of existing data. 
db.dropDatabase()

// Create a collection for User Service (USV)
db.createCollection("users")
// Optionally, you can define indexes or validations for the "users" collection here

// Insert a sample user with an "id" field
db.users.insert({
  id: 1, // Unique ID for the user
  name: "John Doe",
  email: "johndoe@example.com",
})

// Create a collection for Question Service (QSV)
db.createCollection("questions")
// Optionally, you can define indexes or validations for the "questions" collection here

// Insert a sample question with an "id" field
db.questions.insert([
  {
    questionId: 1,
    userId: "1", 
    title: "What is JavaScript?",
    description: "Explain what JavaScript is and its role in web development.",
    type: "Technical Competency",
    complexity: "Medium",
    postedBy: "John Doe",
    answers: [] 
  },
  {
    questionId: 2,
    userId: "1",
    title: "Tell me about yourself.",
    description: "Provide an overview of your background, education, and work experience.",
    type: "General",
    complexity: "Easy",
    postedBy: "John Doe",
    answers: []
  },
  {
    questionId: 3,
    userId: "1",
    title: "How do you handle conflicts in a team?",
    description: "Describe your approach to resolving conflicts and fostering teamwork.",
    type: "Behavioural or Situational",
    complexity: "Medium",
    postedBy: "John Doe",
    answers: []
  },
  {
    questionId: 4,
    userId: "1",
    title: "What are your long-term career goals?",
    description: "Share your aspirations and plans for your future career.",
    type: "Motivation and Career Goals",
    complexity: "Easy",
    postedBy: "John Doe",
    answers: []
  },
  {
    questionId: 5,
    userId: "1",
    title: "Explain the concept of object-oriented programming (OOP).",
    description: "Discuss the principles and benefits of OOP in software development.",
    type: "Technical Competency",
    complexity: "Hard",
    postedBy: "John Doe",
    answers: []
  }
])
