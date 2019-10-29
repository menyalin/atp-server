import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import md5 from 'md5'

const userSchema = new mongoose.Schema({
  email: {
    index: true,
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  roles: {
    type: [String]
  }

})

userSchema.methods.isCorrectPassword = async function (pass) {
  const res = await bcrypt.compare(pass, this.password)
  return res
}
userSchema.pre('save', function (next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.email)}?d=identicon`
  next()
})
userSchema.pre('save', function (next) {
  const tmpUser = this
  if (this.isModified('password')) {
    bcrypt.hash(tmpUser.password, 10, (_, hash) => {
      tmpUser.password = hash
      next()
    })
  } else {
    next()
  }
})

export default mongoose.model('User', userSchema)
