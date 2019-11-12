import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

const createToken = async (user) => {
  const token = await jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return token
}

export const signupUser = async (parent, { name, email, password }, { models: { User } }) => {
  const user = await User.findOne({
    where: { email }
  })
  if (user) {
    throw new Error('email already exists!')
  }
  const newUser = await User.create({ name, email, password })
  return ({
    token: await createToken(newUser)
  })
}

export const signinUser = async (_, { email, password }, { models: { User } }) => {
  const user = await User.findOne({ where: { email } })
  if (user && user.password === password) {
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
    const user = await User.findByPk(me.id)
    return user
  }
}

export const getAllUsers = async (_, args, { models: { User }, me }) => {
  const allUsers = await User.findAll()
  return allUsers
}

export const isExistEmail = async (_, { email }, { models: { User } }) => {
  const user = await User.findOne({ where: { email } })
  return !!user
}

export const getMyPhone = async (_, args, { models: { Phone }, me }) => {
  const phones = await Phone.find({ userId: me.id, isActive: true })
  return phones
}

export const addMyPhone = async (_, { type, number, isMain }, { models: { Phone }, me }) => {
  const newMyPhone = new Phone({
    userId: me.id,
    type,
    number,
    isMain
  })
  if (newMyPhone.isMain) {
    await Phone.updateMany({ userId: me.id }, { isMain: false })
  }
  await newMyPhone.save()
  const userPhones = await Phone.find({ userId: me.id, isActive: true })
  return userPhones
}

export const deleteMyPhone = async (_, { _id }, { models: { Phone }, me }) => {
  await Phone.findOneAndUpdate({ _id, userId: me.id }, { isActive: false, deleted: new Date() })
  const userPhones = await Phone.find({ userId: me._id, isActive: true })
  return userPhones
}

export const updateMyPhone = async (_, { _id, type, isMain }, { models: { Phone }, me }) => {
  if (isMain) {
    await Phone.updateMany({ userId: me.id }, { isMain: false })
  }
  await Phone.findOneAndUpdate({ _id, userId: me.id }, { type, isMain })
  const userPhones = await Phone.find({ userId: me.id, isActive: true })
  return userPhones
}
