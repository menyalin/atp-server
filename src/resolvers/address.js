
import { allAddresses, createAddress, filteredAddresses } from '../controllers/address'

export default {
  Query: {
    allAddresses,
    filteredAddresses
  },
  Mutation: {
    createAddress
  }
}
