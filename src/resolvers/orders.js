import {
  orders, createOrder, orderPage, updateOrder, ordersForVuex
} from '../controllers/order'
import { pubsub } from '../pubsub'


export default {
  Query: {
    orders,
    orderPage,
    ordersForVuex
  },
  Mutation: {
    createOrder,
    updateOrder
  },
  Subscription: {
    orderAdded: {
      subscribe: () => pubsub.asyncIterator([ 'orderAdded' ])
    }
  }
}