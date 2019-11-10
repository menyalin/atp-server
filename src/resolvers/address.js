
import {
  allAddresses, createAddress, filteredAddresses,
  addressById, addressPages
} from '../controllers/address'

export default {
  Query: {
    allAddresses,
    filteredAddresses,
    addressById,
    addressPages
  },
  Mutation: {
    createAddress
  }
}
