import { Op } from 'sequelize'
import { pubsub } from '../pubsub'

export const carPage = async (_, { offset, limit }, { models: { Car } }) => {
  const searchQuery = {
    isActive: true
  }
  const res = await Car.findAndCountAll({
    where: searchQuery,
    offset,
    limit,
    order: []
  })
  return {
    cars: res.rows,
    totalCar: res.count
  }
}
export const createCar = async (_, args, { models: { Car } }) => {
  try {
    const data = await Car.create(args)
    return data
  } catch (e) {
    throw new Error('Ошибка создания записи Car')
  }
}
export const cars = async (_, { type }, { models: { Car } }) => {
  try {
    const res = Car.findAll({
      where: { type }
    })
    return res
  } catch (e) {
    throw new Error('Ошибка поиска в таблице "Cars"')
  }
}
export const carsForVuex = async (_, args, { models: { Car } }) => {
  try {
    const res = Car.findAll()
    return res
  } catch (e) {
    throw new Error('Ошибка поиска в таблице "Cars"')
  }
}
export const filteredCars = async (_, { filter, carType }, { models: { Car } }) => {
  const searchQuery = {
    isActive: true,
    title: { [Op.iRegexp]: filter }
  }
  try {
    const result = await Car.findAll({
      where: {
        ...searchQuery
      },
      limit: 50
    })
    return result
  } catch (e) {
    throw new Error(e.message)
  }
}
export const carById = async (_, { id }, { models: { Car } }) => {
  const res = await Car.findByPk(id)
  return res
}
export const createCarWorkSchedule = async (_, args, { models: { CarWorkSchedule } }) => {
  try {
    const data = await CarWorkSchedule.create(args)
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: data })
    return data
  } catch (e) {
    throw new Error('Ошибка создания записи CarWorkSchedule')
  }
}
export const updateCarWorkSchedule = async (_, args, { models: { CarWorkSchedule } }) => {
  const scheduleId = args.id
  delete args.id
  try {
    const updatedCarWorkSchedule = await CarWorkSchedule.findByPk(scheduleId)
    if (updatedCarWorkSchedule) {
      await updatedCarWorkSchedule.update(args)
      pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule })
      return updatedCarWorkSchedule
    } else {
      throw new Error(`Запись с ID ${scheduleId} не найдена`)
    }
  } catch (e) {
    throw new Error('Ошибка обновления записи CarWorkSchedule')
  }
}
export const carWorkScheduleForVuex = async (_, args, { models: { CarWorkSchedule } }) => {
  try {
    const res = CarWorkSchedule.findAll()
    return res
  } catch (e) {
    throw new Error('Ошибка поиска в таблице "CarWorkSchedule"')
  }
}
export const deleteCarWorkSchedule = async (_, { id }, { models: { CarWorkSchedule } }) => {
  try {
    const item = await CarWorkSchedule.findByPk(id)
    await item.destroy()
    pubsub.publish('deletedCarWorkSchedule', { deletedCarWorkSchedule: id })
    return true
  } catch (e) {
    throw new Error('Ошибка удаления записи')
  }
}
