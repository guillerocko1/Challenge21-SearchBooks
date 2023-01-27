const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    books: [Book]!
  }

  type Book {
    bookId: ID
    description: String!
    image: String
    link: String
    title: String!
    authors: [String]!

  }

  type Auth {
    token: ID!
    user: User
  }

  
  input bookInput{
    bookId: ID
    description: String!
    image: String
    link: String
    title: String!
    authors: [String!]!
  }

type Query{
  me:User
}

  type Query {
    users: [User]
    user(username: String): User
    books: [Book]
    book(bookId: String): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookData: bookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
