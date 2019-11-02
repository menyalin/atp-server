import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  name: String,
  partner: String,
  address: String,
  shortName: String,
  note: String,
  isShipmentPlace: Boolean,
  isDeliveryPlace: Boolean,
  created: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

export default mongoose.model('Address', addressSchema)
