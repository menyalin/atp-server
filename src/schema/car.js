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
  owner: String
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
type CarUnit {
  id: ID
  startDate: String
  truckId: String
  trailerId: String
  driverId1: String
  driverId2: String
  isActive: Boolean
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

  carUnitUpdated: CarUnit
}
extend type Mutation {
  createCar (title: String!, owner: String, isOwned: Boolean, type: String!, maxPltCount: Int, note: String, reg: String, pts: String, listItem: Int, regNumber: String, isActive:Boolean): Car
  updateCar (id: ID! title: String!, owner: String, isOwned: Boolean, type: String!, maxPltCount: Int, note: String, reg: String, pts: String, listItem: Int, regNumber: String isActive:Boolean): Car

  createCarWorkSchedule(carId: String!, type: CarWorkScheduleType!, dateRange: String!, note: String, title: String): CarWorkSchedule
  updateCarWorkSchedule(id: ID!, carId: String!, type: CarWorkScheduleType!, dateRange: String!, note: String, title: String): CarWorkSchedule
  deleteCarWorkSchedule(id: ID!): Boolean
  
  createCarUnit(startDate: String! truckId: String! trailerId: String driverId1:String! driverId2:String note:String): CarUnit
}
`
