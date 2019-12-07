import { gql } from 'apollo-server-express'

export default gql`

type Schedule {
  id: ID
  type: String
  date: String
  carId: String
  car: Car
  userId: String
  user: User
}

enum userRoleNames {
  admin
  dispatcher
  manager
  observer
}
type userRole {
  id: ID
  userId: String
  user: User
  role: userRoleNames
  isActive: Boolean
} 
type User {
    id: ID
    email: String!
    name: String!
    password: String!
    isActive: Boolean
    roles: [String]
 }
  type Token {
    token: String!
  }
  
  type Query {
    getCurrentUser: User
    getAllUsers: [User]
    isExistEmail (email: String!): Boolean
    usersForAdminPanel: [User]
    staff: [userRole]
    scheduleForVuex(startDate: String, endDate: String): [Schedule]
  }
  extend type Subscription {
    scheduleUpdated: Schedule
    staffUpdated: userRole
  }
  type Mutation {
    createRole(userId: String, role: String): userRole
    signupUser(
      name: String
      email: String
      password: String
    ): Token!
    signinUser(email: String!, password: String!): Token!
    changeUserStatus(userId: String!, isActive: Boolean!): User
    changeDispatcherRole(userId: String!, isDispatcher: Boolean!): userRole
    updateSchedule(date: String!, userId: String, scheduleId: String): Schedule
  }
`
