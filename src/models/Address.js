import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  partner: {
    type: String
  },

  address: {
    type: String,
    text: true
  },
  shortName: {
    type: String

  },
  note: {
    type: String
  },
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
