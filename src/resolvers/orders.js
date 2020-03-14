import {
  orders, createOrder, orderPage, updateOrder, ordersForVuex, confirmOrder, deleteOrder,
  updateTemplate, orderTemplates, createOrderTemplate, deleteOrderTemplate
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
    confirmOrder,
    deleteOrder,
    createOrderTemplate,
    updateTemplate,
    deleteOrderTemplate
  },
  Subscription: {
    orderAdded: {
      subscribe: () => pubsub.asyncIterator(['orderAdded'])
    },
    orderUpdated: {
      subscribe: () => pubsub.asyncIterator(['orderUpdated'])
    },
    orderDeleted: {
      subscribe: () => pubsub.asyncIterator(['orderDeleted'])
    },
    orderTemplateUpdated: {
      subscribe: () => pubsub.asyncIterator(['orderTemplateUpdated'])
    },
    orderTemplateDeleted: {
      subscribe: () => pubsub.asyncIterator(['orderTemplateDeleted'])
    }
  }
}
