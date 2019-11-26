import { gql } from 'apollo-server-express'


export default gql`
type Order {
  id: ID
  carType: String
  shipperId: String
  shipper: Address
  consigneeId: String
  consignee: Address
  status: String 
  note: String
  confirmDate: String
  managerId: String
  manager: User
}

extend type Query {
  orders: [Order]
}

extend type Mutation {
  createOrder(carType: String!, confirmDate: String, shipperId: String, consigneeId: String): Order
}

`
