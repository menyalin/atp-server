import {
  createDriver, updateDriver, deleteDriver,
  driversForVuex
} from '../controllers/driver'
import { pubsub } from '../pubsub'

export default {
  Query: {
    driversForVuex
  },
  Mutation: {
    createDriver,
    updateDriver,
    deleteDriver
  },
  Subscription: {
    // addressAdded: {
    //   subscribe: () => pubsub.asyncIterator([ 'addressAdded' ])
    // },
    driverUpdated: {
      subscribe: () => pubsub.asyncIterator(['driverUpdated'])
    },
    driverDeleted: {
      subscribe: () => pubsub.asyncIterator(['driverDeleted'])
    }
  }
}
