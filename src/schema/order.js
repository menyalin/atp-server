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
  plannedShippingDate: String
  plannedDeliveryDate: String
  loadingStart: String
  loadingEnd: String
  unLoadingStart: String
  unLoadingEnd: String
  isDriverNotified: Boolean
  isClientNotified: Boolean
  carId: String
  car: Car
  templateId: String
  templateName: String
  showInMenu: Boolean
  lengthCell: Int
  attention: Boolean
  driver1Id: String
  driver2Id: String
  trailerId: String
  plannedCarType: String
  weight: String
  pltCount: String
  price: String
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
  orderDeleted: Order
  orderTemplateUpdated: Order
  orderTemplateDeleted: ID
}


extend type Mutation {
  createOrderTemplate (carType: String!, shipperId: String, consigneeId: String, status: String, note: String, templateName: String, lengthCell:Int! plannedCarType: String
                        weight: String pltCount: String price: String): Order
  updateTemplate (id: ID!, carType: String!, shipperId: String, consigneeId: String, status: String, note: String, templateName: String, 
                  showInMenu: Boolean, lengthCell:Int! plannedCarType: String weight: String pltCount: String price: String): Order
  deleteOrderTemplate(id: ID!): Boolean
  
  deleteOrder(id: ID!): Order
  createOrder(
    carType: String!, 
    dateRange: String!,
    shipperId: String, 
    consigneeId: String,
    carId: String, 
    status: String, 
    note: String, 
    plannedShippingDate: String,  
    plannedDeliveryDate: String,
    loadingStart: String
    loadingEnd: String 
    unLoadingStart: String
    unLoadingEnd: String 
    isDriverNotified:Boolean,
    isClientNotified: Boolean
    lengthCell: Int
    templateId: String
    attention: Boolean
    driver1Id: String
    driver2Id: String
    trailerId: String
    plannedCarType: String
    weight: String
    pltCount: String
    price: String
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
    plannedShippingDate: String,  
    plannedDeliveryDate: String,
    loadingStart: String
    loadingEnd: String
    unLoadingStart: String
    unLoadingEnd: String 
    isDriverNotified: Boolean
    isClientNotified: Boolean
    templateId: String
    lengthCell: Int
    attention: Boolean
    driver1Id: String
    driver2Id: String
    trailerId: String
    plannedCarType: String
    weight: String
    pltCount: String
    price: String
    ): Order
    confirmOrder (id: ID! carType: String! dateRange: String! carId: String ): Order
}

`
