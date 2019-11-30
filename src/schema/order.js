import { gql } from 'apollo-server-express'

export default gql`
type Order {
  id: ID
  number: Int
  carType: String
  shipperId: String
  shipper: Address
  consigneeId: String
  consignee: Address
  status: String 
  note: String
  confirmDate: String
  confirmTime: String
  managerId: String
  manager: User
  shippingDate: String
  shippingTime: String
  deliveryDate: String
  deliveryTime: String
  isDriverNotified: Boolean
  isClientNotified: Boolean
  confirmedCarId: String
  confirmedCar: Car
}

type OrderPage {
  orders: [Order]
  orderCount: Int
}

extend type Query {
  orders: [Order]
  orderPage(limit: Int, offset: Int): OrderPage
}

extend type Mutation {
  createOrder(
    carType: String!, 
    confirmDate: String, 
    confirmTime: String, 
    shipperId: String, 
    consigneeId: String,
    confirmedCarId: String, 
    status: String, 
    note: String, 
    shippingDate: String, 
    shippingTime: String, 
    deliveryDate: String, 
    deliveryTime: String,
    isDriverNotified: Boolean,
    isClientNotified: Boolean
    ): Order
  updateOrder (
    id: ID
    carType: String, 
    confirmDate: String, 
    confirmTime: String, 
    shipperId: String, 
    consigneeId: String, 
    confirmedCarId: String, 
    status: String, 
    note: String, 
    shippingDate: String, 
    shippingTime: String, 
    deliveryDate: String, 
    deliveryTime: String
    isDriverNotified: Boolean
    isClientNotified: Boolean
    ): Order
}

`
