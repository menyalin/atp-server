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

type Subscription {
  addressAdded: Address
  addressUpdated: Address
}

extend type Mutation {
   createAddress (partner: String, 
                  address:String, 
                  shortName:String,
                  note: String,
                  isShippingPlace: Boolean,
                  isDeliveryPlace: Boolean ): Address
  updateAddress (id: ID, isActive: Boolean,
                  partner: String, 
                  address:String, 
                  shortName:String,
                  note: String,
                  isShippingPlace: Boolean,
                  isDeliveryPlace: Boolean ): Address
  blockAddress (id: ID): Boolean                
  }
extend type Query {
  allAddresses: [Address]
  addressPages(offset: Int, limit: Int, search: String, isShippingPlace: Boolean, isDeliveryPlace: Boolean): AddressPage
  addressById(id: ID): Address
  filteredAddresses (filter: String, type: String): [Address]
  addressesForVuex: [Address]
}

`
