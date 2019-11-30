import {
  orders, createOrder, orderPage, updateOrder
} from '../controllers/order'

export default {
  Query: {
    orders,
    orderPage
  },
  Mutation: {
    createOrder,
    updateOrder
  }
}