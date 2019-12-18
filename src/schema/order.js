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
  createOrderTemplate (carType: String!, shipperId: String, consigneeId: String, status: String, note: String, templateName: String ): Order
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
