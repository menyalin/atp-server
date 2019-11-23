import { gql } from 'apollo-server-express'

export default gql`


type Car {
  id: ID
  title: String
  reg: String
  pts: String
  isOwned: Boolean
  type: String
  maxPltCount: Int
  note: String
  isActive: Boolean
  createdAt: String
  updatedAt: String
}

type CarPage {
  cars: [Car]
  totalCar: Int
}

extend type Query {
  carPage (offset: Int!, limit: Int!): CarPage
}

extend type Mutation {
  createCar (title: String!, isOwned: Boolean!, type: String!, maxPltCount: Int, note: String, reg: String, pts: String): Car
}

`
