import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: String,
  fullName: String,
  inn: String,
  created: {
    type: Date,
    default: Date.now
  },
  isActive: Boolean,
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

export default mongoose.model('Company', companySchema)
