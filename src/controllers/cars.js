import { Op } from 'sequelize'
import { sequelize } from '../pgDB'
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
    const res = await sequelize.query(`
      INSERT INTO "carWorkSchedules" ( type, "carId", "dateRange", note, title, "createdAt", "updatedAt" )
      VALUES ( :type, :carId, :dateRange, :note, :title, :createdAt, :updatedAt)
      RETURNING *
      `, {
      replacements: {
        type: args.type,
        carId: args.carId,
        note: args.note,
        dateRange: args.dateRange,
        title: args.title,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      type: sequelize.QueryTypes.INSERT
    })
    pubsub.publish('createdCarWorkSchedule', { createdCarWorkSchedule: res[0][0] })
    return res[0][0]
  } catch (e) {
    throw new Error('Ошибка создания записи CarWorkSchedule')
  }
}
export const updateCarWorkSchedule = async (_, args, { models: { CarWorkSchedule } }) => {
  try {
    const res = await sequelize.query(`
      UPDATE "carWorkSchedules" 
      SET type=:type, "carId"=:carId, "dateRange"=:dateRange, note=:note, title=:title, "updatedAt"=:updatedAt 
      WHERE id=:id
      RETURNING *;
    `, {
      replacements: {
        id: args.id,
        type: args.type,
        carId: args.carId,
        note: args.note,
        dateRange: args.dateRange,
        title: args.title,
        updatedAt: new Date()
      }
    })
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: res[0][0] })
    return res[0][0]
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
