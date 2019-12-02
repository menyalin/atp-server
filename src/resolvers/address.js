import {
  allAddresses, createAddress, filteredAddresses,
  addressById, addressPages, updateAddress, blockAddress, addressesForVuex
} from '../controllers/address'
import { pubsub } from '../pubsub'

export default {
  Query: {
    allAddresses,
    filteredAddresses,
    addressById,
    addressPages,
    addressesForVuex
  },
  Mutation: {
    createAddress,
    updateAddress,
    blockAddress
  },
  Subscription: {
    addressAdded: {
      subscribe: () => pubsub.asyncIterator([ 'addressAdded' ])
    },
    addressUpdated: {
      subscribe: () => pubsub.asyncIterator([ 'addressUpdated' ])
    }
  }
}
