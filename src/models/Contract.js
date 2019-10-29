import mongoose from 'mongoose'

const contractSchema = new mongoose.Schema({
  type: String,
  name: String,
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  date: String,
  created: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isMain: {
    type: Boolean,
    default: true
  },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Contract', contractSchema)
