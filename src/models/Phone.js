import mongoose from 'mongoose'

const phoneSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isMain: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Date
  }
})

export default mongoose.model('Phone', phoneSchema)
