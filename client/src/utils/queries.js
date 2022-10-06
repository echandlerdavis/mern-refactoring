import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        singleUser(userId: $userId) {
            _id
            name
            savedBooks
        }
    }
`;

export const QUERY_USERS = gql`
  query users {
    _id
    username
    email
    password
  }
  `;