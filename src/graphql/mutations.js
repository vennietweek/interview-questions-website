import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
  mutation SignUpUser($name: String!, $email: String!) {
    signUpUser(name: $name, email: $email) {
      userId
      name
      email
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($userId: ID!, $name: String!) {
    updateUserProfile(userId: $userId, name: $name) {
      userId
      name
      email
    }
  }
`;

export const DEREGISTER_USER = gql`
  mutation DeregisterUser($userId: ID!) {
    deregisterUser(userId: $userId)
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($userId: ID!, $title: String!, $description: String!, $type: String!, $complexity: String!) {
    addQuestion(userId: $userId, title: $title, description: $description, type: $type, complexity: $complexity) {
      questionId
      userId
      title
      description
      type
      complexity
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $questionId: ID!
    $title: String
    $description: String
    $type: String
    $complexity: String
  ) {
    updateQuestion(questionId: $questionId, title: $title, description: $description, type: $type, complexity: $complexity) {
      questionId
      title
      description
      type
      complexity
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: ID!) {
    deleteQuestion(questionId: $questionId)
  }
`