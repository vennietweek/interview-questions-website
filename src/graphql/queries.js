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

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      id
      name
      email
      questions {
        questionId
        title
        description
        type
        complexity
        postedBy
      }
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
      postedBy
      answers {
        questionId
        userId
        answer
      }
    }
  }
`;
