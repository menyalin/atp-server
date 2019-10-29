import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

const createToken = async (user) => {
  const token = await jwt.sign({
    _id: user._id,
    email: user.email
  }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return token
}

export const signupUser = async (parent, { name, email, password, roles }, { models: { User } }) => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error('email already exists!')
  }
  const newUser = await new User({ name, email, password, roles }).save()
  return ({
    token: await createToken(newUser)
  })
}

export const signinUser = async (_, { email, password }, { models: { User } }) => {
  const user = await User.findOne({ email })
  if (user && await user.isCorrectPassword(password)) {
    return ({
      token: await createToken(user)
    })
  } else {
    throw new Error('User not found')
  }
}

export const getCurrentUser = async (_, args, { models: { User }, me }) => {
  if (!me) {
    throw new AuthenticationError('foul_token')
  } else {
    const user = await User.findById(me._id)
    return user
  }
}

export const getAllUsers = async (_, args, { models: { User }, me }) => {
  const allUsers = await User.find()
  return allUsers
}

export const isExistEmail = async (_, { email }, { models: { User } }) => {
  const user = await User.findOne({ email })
  return !!user
}

export const getMyPhone = async (_, args, { models: { Phone }, me }) => {
  const phones = await Phone.find({ userId: me._id, isActive: true })
  return phones
}

export const addMyPhone = async (_, { type, number, isMain }, { models: { Phone }, me }) => {
  const newMyPhone = new Phone({
    userId: me._id,
    type,
    number,
    isMain
  })
  if (newMyPhone.isMain) {
    await Phone.updateMany({ userId: me._id }, { isMain: false })
  }
  await newMyPhone.save()
  const userPhones = await Phone.find({ userId: me._id, isActive: true })
  return userPhones
}

export const deleteMyPhone = async (_, { _id }, { models: { Phone }, me }) => {
  await Phone.findOneAndUpdate({ _id, userId: me._id }, { isActive: false, deleted: new Date() })
  const userPhones = await Phone.find({ userId: me._id, isActive: true })
  return userPhones
}

export const updateMyPhone = async (_, { _id, type, isMain }, { models: { Phone }, me }) => {
  if (isMain) {
    await Phone.updateMany({ userId: me._id }, { isMain: false })
  }
  await Phone.findOneAndUpdate({ _id, userId: me._id }, { type, isMain })
  const userPhones = await Phone.find({ userId: me._id, isActive: true })
  return userPhones
}
