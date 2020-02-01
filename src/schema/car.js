import { gql } from 'apollo-server-express'

export default gql`

type dateRange {
  value: String
  inclusive: Boolean
}

enum CarWorkScheduleType {
  service
  holiday
}

type Car {
  id: ID
  title: String
  listItem: Int
  regNumber: String
  reg: String
  pts: String
  isTempSlot: Boolean
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
  dateRange: [dateRange]
  title: String
  note: String
}


extend type Query {
  carsForVuex: [Car]
  carWorkScheduleForVuex: [CarWorkSchedule]
}

extend type Subscription {
  updatedCarWorkSchedule: CarWorkSchedule
  deletedCarWorkSchedule: String
  carUpdated: Car
}
extend type Mutation {
  createCar (title: String!, isOwned: Boolean, type: String!, maxPltCount: Int, note: String, reg: String, pts: String, listItem: Int, regNumber: String): Car

  createCarWorkSchedule(carId: String!, type: CarWorkScheduleType!, dateRange: String!, note: String, title: String): CarWorkSchedule
  updateCarWorkSchedule(id: ID!, carId: String!, type: CarWorkScheduleType!, dateRange: String!, note: String, title: String): CarWorkSchedule
  deleteCarWorkSchedule(id: ID!): Boolean 
}
`
