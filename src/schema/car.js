import { gql } from 'apollo-server-express'

export default gql`

enum CarWorkScheduleType {
  service
  holiday
}

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
type CarWorkSchedule {
  id: ID
  carId: String
  car: Car
  type: CarWorkScheduleType
  startDate: String
  startTime: String
  endDate: String
  endTime: String
  note: String
}

type CarPage {
  cars: [Car]
  totalCar: Int
}

extend type Query {
  carPage (offset: Int!, limit: Int!): CarPage
  cars(type: String): [Car]
  carsForVuex: [Car]
  filteredCars(filter: String): [Car]
  carById(id: ID): Car
  carWorkScheduleForVuex: [CarWorkSchedule]
}

extend type Subscription {
  updatedCarWorkSchedule: CarWorkSchedule
  deletedCarWorkSchedule: String
}
extend type Mutation {
  createCar (title: String!, isOwned: Boolean!, type: String!, maxPltCount: Int, note: String, reg: String, pts: String): Car
  createCarWorkSchedule(carId: String!, type: CarWorkScheduleType!, startDate: String!, startTime: String!, endDate: String!, endTime: String!, note: String): CarWorkSchedule
  updateCarWorkSchedule(id: ID!, carId: String!, type: CarWorkScheduleType!, startDate: String!, startTime: String!, endDate: String!, endTime: String!, note: String): CarWorkSchedule
  deleteCarWorkSchedule(id: ID!): Boolean 
}
`
