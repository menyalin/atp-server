import { gql } from 'apollo-server-express'

export default gql`
type Address {
  id: ID
  partner: String 
  address: String 
  shortName: String
  note: String
  isShippingPlace: Boolean
  isDeliveryPlace: Boolean
  isActive: Boolean
  createdAt: String
  updatedAt: String
}

type AddressPage {
  addresses: [Address]
  totalCount: Int
}


extend type Mutation {
   createAddress (partner: String, 
                  address:String, 
                  shortName:String,
                  note: String,
                  isShippingPlace: Boolean,
                  isDeliveryPlace: Boolean ): Address
  }
extend type Query {
  allAddresses: [Address]
  addressPages(offset: Int, limit: Int): AddressPage
  addressById(id: String): Address
  filteredAddresses (filter: String, type: String, id: ID): [Address]
}

`
