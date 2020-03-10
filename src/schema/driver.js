import { gql } from 'apollo-server-express'
export default gql`
type Driver {
    id: ID
    shortName: String
    fullName: String
    phone1: String
    phone2: String
    passport: String
    driversLicense: String
    note: String
    isActive: Boolean
}

extend type Query {
    driversForVuex: [Driver]
    freeDrivers(dateRange: String! carUnitId: String driver1Id:String driver2Id:String): [Driver]
}

extend type Mutation {
    createDriver (shortName: String, fullName: String, phone1: String, phone2: String, passport: String, driversLicense: String, note: String): Driver
    updateDriver (id: ID!, shortName: String, fullName: String, phone1: String, phone2: String, passport: String, driversLicense: String, note: String isActive:Boolean): Driver
    deleteDriver (id: ID!): Boolean
}

extend type Subscription {
    driverUpdated: Driver
    driverDeleted: Driver
}

`

