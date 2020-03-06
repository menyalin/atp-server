import {
  createDriver, updateDriver, deleteDriver,
  driversForVuex, freeDrivers
} from '../controllers/driver'
import { pubsub } from '../pubsub'

export default {
  Query: {
    driversForVuex,
    freeDrivers
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
