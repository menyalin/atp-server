
import {
  allAddresses, createAddress, filteredAddresses,
  addressById, addressPages, updateAddress, blockAddress
} from '../controllers/address'

export default {
  Query: {
    allAddresses,
    filteredAddresses,
    addressById,
    addressPages
  },
  Mutation: {
    createAddress,
    updateAddress,
    blockAddress
  }
}
