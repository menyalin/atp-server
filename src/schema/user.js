import { gql } from 'apollo-server-express'

export default gql`
type Phone {
    _id: ID
    userId: String!
    type: String!
    number: String!
    isActive: Boolean!
    isMain: Boolean
    created: String
    deleted: String
}  
type User {
    id: ID
    email: String!
    name: String!
    password: String!
 }
  type Token {
    token: String!
  }
  
  type Query {
    getCurrentUser: User
    getAllUsers: [User]
    isExistEmail (email: String!): Boolean
    userPhones: [Phone]
  }
  type Mutation {
    signupUser(
      name: String
      email: String
      password: String
      roles: [String]
    ): Token!
    signinUser(email: String!, password: String!): Token!
    addMyPhone(type: String!, number: String!, isMain: Boolean): [Phone]
    deleteMyPhone(_id: String): [Phone]
    updateMyPhone(_id: String, type: String, isMain: Boolean): [Phone]
  }
`
