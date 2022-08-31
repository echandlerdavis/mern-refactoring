const { gql } = require('apollo-server-express');

const typeDefs = gql `
 
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

type Query {
    singleUser(_id:String!): User
}

type Mutation {
    createUser(_id: String! username: String! email:String! password: String!): User
    saveBook(_id:String!): Book
    deleteBook(_id:String!): Book
    #login?
}
}
`