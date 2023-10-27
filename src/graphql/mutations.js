// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
  mutation SignUpUser($name: String!, $email: String!, $profile: UserProfileInput!) {
    signUpUser(name: $name, email: $email, profile: $profile) {
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

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($profile: UserProfileInput!) {
    updateUserProfile(profile: $profile) {
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

export const ADD_QUESTION = gql`
  mutation AddQuestion($title: String!, $description: String!, $complexity: String!) {
    addQuestion(title: $title, description: $description, complexity: $complexity) {
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

