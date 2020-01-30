import { Op } from 'sequelize'
import { sequelize } from '../pgDB'
import { pubsub } from '../pubsub'
import { parseDateRange, searchCross } from '../utils'

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
    const res = Car.findAll({
      order: ['listItem']
    })
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
export const createCarWorkSchedule = async (_, args, { models: { CarWorkSchedule, Order } }) => {
  try {
    args.dateRange = parseDateRange(args.dateRange)
    if (await searchCross(args.carId, args.dateRange, Order)) throw new Error('Пересечение с рейсом!')
    if (await searchCross(args.carId, args.dateRange, CarWorkSchedule)) throw new Error('Пересечение! Транспортное средство недоступно. Сервис или выходной')
    const newCarSchedule = await CarWorkSchedule.create(args)
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: newCarSchedule })
    return newCarSchedule
  } catch (e) {
    throw new Error('Ошибка создания записи CarWorkSchedule')
  }
}
export const updateCarWorkSchedule = async (_, args, { models: { CarWorkSchedule, Order } }) => {
  try {
    const { id } = args
    delete args.id
    args.dateRange = parseDateRange(args.dateRange)
    if (await searchCross(args.carId, args.dateRange, Order)) throw new Error('Пересечение с рейсом!')
    if (await searchCross(args.carId, args.dateRange, CarWorkSchedule)) throw new Error('Пересечение! Транспортное средство недоступно. Сервис или выходной')
    const updatedCarSchedule = await CarWorkSchedule.findByPk(id)
    await updatedCarSchedule.update(args)
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: updatedCarSchedule })
    return updatedCarSchedule
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
