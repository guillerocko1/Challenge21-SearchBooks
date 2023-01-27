import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
   query users {
      users{
         _id
         username
         email
         password
      }
   }
`;

export const QUERY_USER = gql`
   query User($username: String) {
      user(username: $username) {
        _id
        username
        email
        password
      }
    }
`;

export const QUERY_ME = gql`
   query Me($id: String) {
      me(_id: $id) {
         _id
         username
         email
         password
   }
 }
`;

export const QUERY_BOOKS = gql`
   query Books {
      books {
         bookId
         description
         title
         image
      }
   }
`;