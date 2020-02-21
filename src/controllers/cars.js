import { Op } from 'sequelize'
import { pubsub } from '../pubsub'
import { CarUnit } from '../models/Car'
import { parseDateRange, searchCross, searchCrossExistOrder, logOperation, datePreparation } from '../utils'
import moment from 'moment'

export const getCarUnitFields = async (truckId, date) => {
  const carUnit = await CarUnit.findOne({
    where: {
      isActive: true,
      startDate: {
        [Op.lte]: date
      },
      truckId: truckId
    },
    order: [['startDate', 'DESC']]
  })
  let carUnitFields = {
    driverId1: null,
    driverId2: null,
    trailerId: null
  }
  if (!!carUnit) {
    carUnitFields.driverId1 = carUnit.driverId1
    carUnitFields.driverId2 = carUnit.driverId2
    carUnitFields.trailerId = carUnit.trailerId
  }
  return carUnitFields
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
export const carWorkScheduleForVuex = async (_, { startDate, endDate }, { models: { CarWorkSchedule } }) => {
  try {
    const res = CarWorkSchedule.findAll({
      where: {
        dateRange: {
          [Op.overlap]: parseDateRange(`[${startDate} 00:00,${endDate} 23:59]`)
        }
      }
    })
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
    return id
  } catch (e) {
    throw new Error('Ошибка удаления записи')
  }
}

export const createCarUnit = async (_, args, { models: { CarUnit }, me }) => {
  try {
    args.dateRange = parseDateRange(args.dateRange)
    const data = await CarUnit.create(args)
    // pubsub.publish('carUnitUpdated', { carUnitUpdated: data })
    // logOperation('carUnit', data.id, 'create', data, me.id)
    return data
  } catch (e) {
    throw new Error('Ошибка создания CarUnit')
  }
}
export const updateCarUnit = async (_, { id, startDate, truckId, trailerId, driverId1, driverId2, note }, { models: { CarUnit }, me }) => {
  try {
    startDate = datePreparation(startDate)
    const carUnit = await CarUnit.findByPk(id)
    await carUnit.update({ startDate, truckId, trailerId: trailerId || null, driverId2: driverId2 || null, driverId1, note: note || null })
    pubsub.publish('carUnitUpdated', { carUnitUpdated: carUnit })
    logOperation('carUnit', id, 'update', carUnit, me.id)
    return carUnit
  } catch (e) {
    throw new Error('Ошибка обновления CarUnit', e.message)
  }
}
export const deleteCarUnit = async (_, { id }, { models: { CarUnit }, me }) => {
  try {
    const carUnit = await CarUnit.findByPk(id)
    carUnit.isActive = false
    await carUnit.save()
    logOperation('carUnit', id, 'delete', carUnit, me.id)
    return id
  } catch (e) {
    throw new Error('Ошибка удаления CarUnit', e.message)
  }
}

export const carUnit = async (_, { date, truckId }, { models: { CarUnit } }) => {
  try {
    const carUnit = await getCarUnitFields(truckId, date)
    return carUnit
  } catch (e) {
    throw new Error('Ошибка запроса CarUnit', e.message)
  }
}
export const carUnitsPage = async (_, { limit, offset }, { models: { CarUnit } }) => {
  try {
    const res = await CarUnit.findAndCountAll({
      offset,
      limit,
      where: {
        isActive: true
      },
      order: [['createdAt', "DESC"]]
    })
    return {
      carUnits: res.rows,
      count: res.count
    }
  } catch (e) {
    throw new Error('Ошибка запроса carUnitsPage', e.message)
  }
}

export const carWorkSchedulePage = async (_, { limit, offset }, { models: { CarWorkSchedule } }) => {
  try {
    const res = await CarWorkSchedule.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', "DESC"]]
    })
    return {
      carWorkSchedule: res.rows,
      count: res.count
    }
  } catch (e) {
    throw new Error('Ошибка запроса carWorkSchedulePages', e.message)
  }
}
