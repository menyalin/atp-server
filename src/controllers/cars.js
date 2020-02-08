import { Op } from 'sequelize'
import { pubsub } from '../pubsub'
import { parseDateRange, searchCross, searchCrossExistOrder, logOperation } from '../utils'

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
export const createCar = async (_, args, { models: { Car }, me }) => {
  try {
    const data = await Car.create(args)
    pubsub.publish('carUpdated', { carUpdated: data })
    logOperation('car', data.id, 'create', data, me.id)
    return data
  } catch (e) {
    throw new Error('Ошибка создания записи Car')
  }
}
export const updateCar = async (_, args, { models: { Car }, me }) => {
  try {
    const { id } = args
    delete args.id
    const car = await Car.findByPk(id)
    await car.update(args)
    pubsub.publish('carUpdated', { carUpdated: car })
    logOperation('car', id, 'update', car, me.id)
    return car
  } catch (e) {
    throw new Error('Ошибка обновления записи Car')
  }
}
export const createCarWorkSchedule = async (_, args, { models: { CarWorkSchedule, Order }, me }) => {
  try {
    args.dateRange = parseDateRange(args.dateRange)
    if (await searchCross(args.carId, args.dateRange, Order)) throw new Error('Пересечение с рейсом!')
    if (await searchCross(args.carId, args.dateRange, CarWorkSchedule)) throw new Error('Пересечение! Транспортное средство недоступно. Сервис или выходной')
    const newCarSchedule = await CarWorkSchedule.create(args)
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: newCarSchedule })
    logOperation('carWorkSchedule', newCarSchedule.id, 'create', newCarSchedule, me.id)
    return newCarSchedule
  } catch (e) {
    throw new Error('Ошибка создания записи CarWorkSchedule')
  }
}
export const updateCarWorkSchedule = async (_, args, { models: { CarWorkSchedule, Order }, me }) => {
  try {
    const { id } = args
    delete args.id
    args.dateRange = parseDateRange(args.dateRange)
    if (await searchCross(args.carId, args.dateRange, Order)) throw new Error('Пересечение с рейсом!')
    if (await searchCrossExistOrder(args.carId, args.dateRange, CarWorkSchedule, id)) throw new Error('Пересечение! Транспортное средство недоступно. Сервис или выходной')
    const updatedCarSchedule = await CarWorkSchedule.findByPk(id)
    await updatedCarSchedule.update(args)
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: updatedCarSchedule })
    logOperation('carWorkSchedule', id, 'update', updatedCarSchedule, me.id)
    return updatedCarSchedule
  } catch (e) {
    throw new Error('Ошибка обновления записи CarWorkSchedule')
  }
}
export const carWorkScheduleForVuex = async (_, args, { models: { CarWorkSchedule } }) => {
  // todo: Ограничить начальной и конечной датами
  try {
    const res = CarWorkSchedule.findAll()
    return res
  } catch (e) {
    throw new Error('Ошибка поиска в таблице "CarWorkSchedule"')
  }
}
export const deleteCarWorkSchedule = async (_, { id }, { models: { CarWorkSchedule }, me }) => {
  try {
    const item = await CarWorkSchedule.findByPk(id)
    logOperation('carWorkSchedule', id, 'delete', item, me.id)
    await item.destroy()
    pubsub.publish('deletedCarWorkSchedule', { deletedCarWorkSchedule: id })
    return true
  } catch (e) {
    throw new Error('Ошибка удаления записи')
  }
}
