import { gql } from 'apollo-server-express'

export default gql`
type Order {
  _id: ID
  carType: String
  status: String 
  shipmentPlaceId: String
  shipmentDate: String
  shipmentTime: String
  deliveryPlaceId: String
  deliveryDate: String
  deliveryTime: String
  confirmedCar: String
  confirmedDate: String
  confirmedTime: String
  note: String
}

extend type Query {
    allOrders: [Order]
}

`
