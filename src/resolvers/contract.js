import { allContracts, myContracts, newContract } from '../controllers/contract'

export default {
  Query: {
    allContracts,
    myContracts
  },
  Mutation: {
    newContract
  }
}
