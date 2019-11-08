
import {
  allAddresses, createAddress, filteredAddresses,
  addressById
} from '../controllers/address'

export default {
  Query: {
    allAddresses,
    filteredAddresses,
    addressById
  },
  Mutation: {
    createAddress
  }
}
