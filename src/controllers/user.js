import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import { pubsub } from '../pubsub'

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
    const user = await User.findOne({ where: { id: me.id, isActive: true } })
    console.log(user)
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

export const createRole = async (_, { userId, role }, { models: { UserRole } }) => {
  const newRole = await UserRole.create({
    userId,
    role
  })
  return newRole
}

export const getUserRoles = async (user, args, { models: { UserRole } }) => {
  const roles = await UserRole.findAll({
    where: {
      userId: user.id,
      isActive: true
    }
  })
  return roles.map(item => item.role)
}

export const staff = async (_, args, { models: { UserRole, User } }) => {
  const staff = await UserRole.findAll({
    include: [
      { model: User, as: 'user' }
    ]
  })
  return staff
}

export const scheduleForVuex = async (_, { startDate, endDate }, { models: { Schedule, User, Car } }) => {
  try {
    const res = await Schedule.findAll({
      where: {
        date: {
          [Op.gte]: new Date(startDate),
          [Op.lte]: new Date(endDate)
        }
      },
      include: [
        { model: User, as: 'user' },
        { model: Car, as: 'car' }
      ]
    })
    return res
  } catch (e) {
    throw new Error(e.message)
  }
}

export const updateSchedule = async (_, { scheduleId, date, userId }, { models: { Schedule, User } }) => {
  if (scheduleId) {
    const schedule = await Schedule.findByPk(scheduleId)
    schedule.userId = userId
    await schedule.save()
    const res = await Schedule.findByPk(schedule.id, { include: [{ model: User, as: 'user' }] })
    pubsub.publish('scheduleUpdated', { scheduleUpdated: res })
    return res
  } else {
    const newSchedule = await Schedule.create({
      type: 'dispatcher',
      date: date,
      userId: userId
    })
    const res = await Schedule.findByPk(newSchedule.id, { include: [{ model: User, as: 'user' }] })
    pubsub.publish('scheduleUpdated', { scheduleUpdated: res })
    return res
  }
}

export const usersForAdminPanel = async (_, args, { models: { User } }) => {
  const allUsers = await User.findAll()
  return allUsers
}

export const changeUserStatus = async (_, { userId, isActive }, { models: { User }, me }) => {
  if (userId === me.id) {
    throw new Error('Попытка закрытия доступа самому себе!')
  }
  const user = await User.findByPk(userId)
  user.isActive = isActive
  await user.save()
  return user
}

export const changeDispatcherRole = async (_, { userId, isDispatcher }, { models: { User, UserRole } }) => {
  let role = await UserRole.findOne({
    where: {
      userId,
      role: 'dispatcher'
    },
    include: [
      { model: User, as: 'user' }
    ]
  })
  if (role && isDispatcher) {
    role.isActive = true
    role.save()
  } else if (role && !isDispatcher) {
    role.isActive = false
    role.save()
  } else {
    const newRole = await UserRole.create({
      userId,
      role: 'dispatcher',
      isActive: true
    })
    role = await UserRole.findByPk(newRole.id, {
      include: [
        { model: User, as: 'user' }
      ]
    })
  }
  pubsub.publish('staffUpdated', { staffUpdated: role })
  return role
}
