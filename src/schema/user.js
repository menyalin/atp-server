import { gql } from 'apollo-server-express'

export default gql`
enum userRoleNames {
  admin
  dispatcher
}
type userRole {
  id: ID
  userId: String
  user: User
  role: userRoleNames
  isActive: Boolean
}

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
    roles: [String]
 }
  type Token {
    token: String!
  }
  
  type Query {
    getCurrentUser: User
    getAllUsers: [User]
    isExistEmail (email: String!): Boolean
    userPhones: [Phone]
    staff: [userRole]
  }
  type Mutation {
    createRole(userId: String, role: String): userRole
    signupUser(
      name: String
      email: String
      password: String
    ): Token!
    signinUser(email: String!, password: String!): Token!
    addMyPhone(type: String!, number: String!, isMain: Boolean): [Phone]
    deleteMyPhone(_id: String): [Phone]
    updateMyPhone(_id: String, type: String, isMain: Boolean): [Phone]
  }
`
