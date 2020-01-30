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
  dateRange: [dateRange]
  shippingDate: String
  shippingTime: String
  deliveryDate: String
  deliveryTime: String
  isDriverNotified: Boolean
  isClientNotified: Boolean
  carId: String
  car: Car
  templateName: String
  showInMenu: Boolean
}

type OrderPage {
  orders: [Order]
  orderCount: Int
}

extend type Query {
  orders: [Order]
  orderTemplates: [Order]
  orderPage(limit: Int, offset: Int): OrderPage
  ordersForVuex(startDate: String, endDate: String): [Order]
}
extend type Subscription {
  orderAdded: Order
  orderUpdated: Order
  orderTemplateUpdated: Order
}


extend type Mutation {
  createOrderTemplate (carType: String!, shipperId: String, consigneeId: String, status: String, note: String, templateName: String, lengthCell:Int ): Order
  updateTemplate (id: ID, carType: String!, shipperId: String, consigneeId: String, status: String, note: String, templateName: String, showInMenu: Boolean, lengthCell:Int): Order
  createOrder(
    carType: String!, 
    dateRange: String!,
    shipperId: String, 
    consigneeId: String,
    carId: String, 
    status: String, 
    note: String, 
    shippingDate: String, 
    shippingTime: String, 
    deliveryDate: String, 
    deliveryTime: String,
    isDriverNotified:Boolean,
    isClientNotified: Boolean
    lengthCell: Int
    ): Order
  updateOrder (
    id: ID!
    carType: String!, 
    dateRange: String!,
    shipperId: String, 
    consigneeId: String, 
    carId: String, 
    status: String, 
    note: String, 
    shippingDate: String, 
    shippingTime: String, 
    deliveryDate: String, 
    deliveryTime: String
    isDriverNotified: Boolean
    isClientNotified: Boolean
    lengthCell: Int
    ): Order
}

`
