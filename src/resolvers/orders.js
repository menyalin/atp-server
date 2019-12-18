import {
  orders, createOrder, orderPage, updateOrder, ordersForVuex, updateTemplate,
  orderTemplates, createOrderTemplate
} from '../controllers/order'
import { pubsub } from '../pubsub'

export default {
  Query: {
    orders,
    orderPage,
    ordersForVuex,
    orderTemplates
  },
  Mutation: {
    createOrder,
    updateOrder,
    createOrderTemplate,
    updateTemplate
  },
  Subscription: {
    orderAdded: {
      subscribe: () => pubsub.asyncIterator('orderAdded')
    },
    orderUpdated: {
      subscribe: () => pubsub.asyncIterator(['orderUpdated'])
    },
    orderTemplateUpdated: {
      subscribe: () => pubsub.asyncIterator(['orderTemplateUpdated'])
    }
  }
}
