
import {
  allAddresses, createAddress, filteredAddresses,
  addressById, addressPages, updateAddress, blockAddress, addressesForVuex
} from '../controllers/address'

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
  }
}
