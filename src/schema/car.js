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
  trailerId: String
  driverId: String
  type: CarWorkScheduleType
  dateRange: [dateRange]
  title: String
  note: String
}
type CarUnit {
  id: ID
  dateRange: [dateRange]
  truckId: String
  trailerId: String
  driver1Id: String
  driver2Id: String
  isActive: Boolean
  note: String
}
type CarWorkSchedulePage {
  carWorkSchedule: [CarWorkSchedule]
  count: Int
}

type CarUnitPage {
  carUnits: [CarUnit]
  count: Int
}

extend type Query {
  carsForVuex: [Car]
  freeCars(dateRange: String!, carUnitId: String): [Car]

  carWorkScheduleForVuex (startDate: String, endDate: String): [CarWorkSchedule]
  carWorkSchedulePage(offset: Int, limit: Int!): CarWorkSchedulePage

  carUnit(date:String! truckId: String!): CarUnit
  carUnitsPage(offset: Int, limit: Int): CarUnitPage
  carUnitForVuex(startDate: String, endDate: String): [CarUnit]
}

extend type Subscription {
  updatedCarWorkSchedule: CarWorkSchedule
  deletedCarWorkSchedule: String
  carUpdated: Car

  carUnitUpdated: CarUnit
  carUnitDeleted: ID!
}
extend type Mutation {
  createCar (title: String!, owner: String, isOwned: Boolean, type: String!, maxPltCount: Int, note: String, reg: String, pts: String, listItem: Int, regNumber: String, isActive:Boolean): Car
  updateCar (id: ID! title: String!, owner: String, isOwned: Boolean, type: String!, maxPltCount: Int, note: String, reg: String, pts: String, listItem: Int, regNumber: String isActive:Boolean): Car

  createCarWorkSchedule(carId: String, trailerId: String driverId: String type: CarWorkScheduleType!, dateRange: String!, note: String, title: String): CarWorkSchedule
  updateCarWorkSchedule(id: ID!, carId: String, trailerId: String driverId: String type: CarWorkScheduleType!, dateRange: String!, note: String, title: String): CarWorkSchedule
  deleteCarWorkSchedule(id: ID!): ID
  
  createCarUnit(dateRange: String! truckId: String! trailerId: String driver1Id:String! driver2Id:String note:String): CarUnit
  updateCarUnit(id: ID! dateRange: String truckId: String! trailerId: String driver1Id:String! driver2Id:String note:String): CarUnit
  deleteCarUnit(id: ID!): ID!
}
`
