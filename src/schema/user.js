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
    roles: [userRoleNames]
 }
  type Token {
    token: String!
  }
  
  type Query {
    getCurrentUser: User
    getAllUsers: [User]
    isExistEmail (email: String!): Boolean
    usersForAdminPanel: [User]
    userRoles: [userRole]
    scheduleForVuex(startDate: String, endDate: String): [Schedule]
  }
  extend type Subscription {
    scheduleUpdated: Schedule
    deletedSchedule: ID
    updatedUserRoles: userRole
    deletedUserRoles: String
  }
  type Mutation {
    createRole(userId: String!, role: String!): userRole
    deleteRole(userId: String! role: String!): Boolean

    changeDispatcherRole(userId: String!, isDispatcher: Boolean!): userRole

    signupUser( name: String email: String password: String ): Token!
    signinUser(email: String!, password: String!): Token!
    changeUserStatus(userId: String!, isActive: Boolean!): User

    createSchedule(date: String!, userId: String!, type: String!): Schedule

    updateSchedule(id: ID! date: String!, userId: String!, type: String!): Schedule
    deleteSchedule(id: ID!): Boolean
  }
`
