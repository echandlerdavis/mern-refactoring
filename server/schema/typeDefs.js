const { gql } = require('apollo-server-express');

const typeDefs = gql`
 
type Book {
    _id: ID!
 authors: [String]
 description: String!
 image: String
 title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Auth{
    token: ID!
    user: User
}

input BookInput{
    authors:[String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
}

type Query {
    users: [User]
    singleUser(userId: ID!): User
}

type Mutation {
    createUser(username: String! email:String! password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData:BookInput!): User
    deleteBook(bookId:ID!): User
}

`
module.exports = typeDefs