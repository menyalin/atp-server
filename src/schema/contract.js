import { gql } from 'apollo-server-express'

export default gql`
type Contract {
    _id: ID
    type: String
    name: String
    partners: [Company]
    date: String 
    created: String
    isActive: Boolean
    manager: User
    isMain: Boolean
}  
extend type Mutation {
  newContract (type: String!, partners: [String], date: String!, isMain: Boolean ): Contract
  }
extend type Query {
  allContracts: [Contract]
  myContracts: [Contract]
}

`
