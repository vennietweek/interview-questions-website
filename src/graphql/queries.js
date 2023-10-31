import { gql } from '@apollo/client';

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions {
    getAllQuestions {
      questionId
      userId
      title
      description
      type
      complexity
    }
  }
`;

export const GET_USER_QUESTIONS = gql`
  query GetUserQuestions($userId: ID!) {
    getUserQuestions(userId: $userId) {
      questionId
      userId
      title
      description
      type
      complexity
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($email: String!) {
    getUserProfile(email: $email) {
      userId
      name
      email
    }
  }
`;
