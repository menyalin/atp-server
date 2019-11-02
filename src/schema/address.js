import { gql } from 'apollo-server-express'

export default gql`
type Address {
  _id: ID
  partner: String 
  address: String 
  shortName: String
  note: String
  isShipmentPlace: Boolean
  isDeliveryPlace: Boolean
  isActive: Boolean
  created: String
}

extend type Mutation {
   createAddress (partner: String, 
                  address:String, 
                  shortName:String,
                  note: String,
                  isShipmentPlace: Boolean,
                  isDeliveryPlace: Boolean ): Address
  }
extend type Query {
  allAddresses: [Address]
}

`
