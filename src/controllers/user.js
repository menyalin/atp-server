import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import { pubsub } from '../pubsub'
import { FieldsOnCorrectTypeRule } from 'graphql'

const createToken = async (user) => {
  const token = await jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_SECRET, { expiresIn: '31d' })
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

export const createRole = async (_, { userId, role }, { models: { UserRole, User } }) => {
  const newRole = await UserRole.create({
    userId,
    role
  })
  await newRole.reload({
    include: [
      { model: User, as: 'user' }
    ]
  })
  pubsub.publish('updatedUserRoles', { updatedUserRoles: newRole })
  return newRole
}

export const deleteRole = async (_, { userId, role }, { models: { UserRole } }) => {
  try {
    const tmpRole = await UserRole.findOne({
      where: {
        userId,
        role
      }
    })
    if (tmpRole) {
      const id = tmpRole.id
      await tmpRole.destroy()
      pubsub.publish('deletedUserRoles', { deletedUserRoles: id })
      return true
    } else return false
  } catch (e) {
    throw new Error(`Ошибка удаления роли: ${e}`)
  }
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

export const userRoles = async (_, args, { models: { UserRole, User } }) => {
  const res = await UserRole.findAll({
    include: [
      { model: User, as: 'user' }
    ]
  })
  return res
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
      ]
    })
    return res
  } catch (e) {
    throw new Error(e.message)
  }
}

export const createSchedule = async (_, args, { models: { Schedule, User } }) => {
  try {
    const res = await Schedule.create(args)
    await res.reload({ include: [{ model: User, as: 'user' }] })
    pubsub.publish('scheduleUpdated', { scheduleUpdated: res })
    return res
  } catch (e) {
    throw new Error(`Ошибка создания Schedule: ${e}`)
  }
}

export const deleteSchedule = async (_, { id }, { models: { Schedule } }) => {
  try {
    const res = await Schedule.findByPk(id)
    if (res) {
      await res.destroy()
      pubsub.publish('deletedSchedule', { deletedSchedule: id })
      return true
    } else return false
  } catch (e) {
    throw new Error(`Ошибка удаления Schedule: ${e}`)
  }
}

export const updateSchedule = async (_, { id, date, userId, type }, { models: { Schedule, User } }) => {
  try {
    const res = await Schedule.findByPk(id)
    if (res) {
      await res.update({
        date,
        userId,
        type
      })
      await res.reload({
        include: [
          { model: User, as: 'user' }
        ]
      })
      pubsub.publish('scheduleUpdated', { scheduleUpdated: res })
      return res
    } else throw new Error('Запись не найдена, обновление не возможно!')
  } catch (e) {
    throw new Error(`Ошибка обновления записи schedule: ${e}`)
  }
}

export const usersForAdminPanel = async (_, args, { models: { User } }) => {
  const allUsers = await User.findAll()
  return allUsers
}

export const changeUserStatus = async (_, { userId, isActive }, { models: { User }, me }) => {
  if (userId === me.id) throw new Error('Попытка закрытия доступа самому себе!')
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
  pubsub.publish('updatedUserRoles', { updatedUserRoles: role })
  return role
}
