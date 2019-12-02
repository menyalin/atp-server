import {
  orders, createOrder, orderPage, updateOrder, ordersForVuex
} from '../controllers/order'

export default {
  Query: {
    orders,
    orderPage,
    ordersForVuex
  },
  Mutation: {
    createOrder,
    updateOrder
  }
}