import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  carType: String,
  status: String,
  shipmentPlaceId: String,
  shipmentDate: String,
  shipmentTime: String,
  deliveryPlaceId: String,
  deliveryDate: String,
  deliveryTime: String,
  confirmedCar: String,
  confirmedDate: String,
  confirmedTime: String,
  note: String,
  created: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

export default mongoose.model('Order', orderSchema)
