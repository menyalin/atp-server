
import {
  allAddresses, createAddress, filteredAddresses,
  addressById, addressPages, updateAddress
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
    updateAddress
  }
}
