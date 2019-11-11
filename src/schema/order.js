import { gql } from 'apollo-server-express'

export default gql`
type Order {
  _id: ID
  carType: String
  status: String 
  shippingPlaceId: String
  shippingDate: String
  shippingTime: String
  deliveryPlaceId: String
  deliveryDate: String
  deliveryTime: String
  confirmedCar: String
  confirmedDate: String
  confirmedTime: String
  note: String
}

`
