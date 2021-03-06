import { Op } from 'sequelize'
import { sequelize } from '../../pgDB'
import { pubsub } from '../../pubsub'
import { CarUnit } from '../../models/Car'
import { parseDateRange, searchCross, searchCrossExistOrder, logOperation, UnixDateRangeToStr } from '../../utils'
import moment from 'moment'

export const getCarUnitFields = async (truckId, date) => {
  const carUnit = await CarUnit.findOne({
    where: {
      isActive: true,
      dateRange: {
        [Op.contains]: date
      },
      truckId: truckId
    }
  })
  let carUnitFields = {
    driver1Id: null,
    driver2Id: null,
    trailerId: null
  }
  if (!!carUnit) {
    carUnitFields.driver1Id = carUnit.driver1Id
    carUnitFields.driver2Id = carUnit.driver2Id
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
export const freeCars = async (_, { dateRange, carUnitId, truckId, trailerId }, { models: { Car } }) => {
  try {
    if (!dateRange) throw new Error("dateRange отсутствует! ошибка запроса freeCars")
    dateRange = UnixDateRangeToStr(dateRange)
    const res = await sequelize.query(`
            SELECT
              * 
            FROM
              "cars" AS c 
            WHERE 
              (c."isActive" = TRUE  ${truckId ? ' OR c.id=:truckId' : ''}
                                    ${trailerId ? ' OR c.id = :trailerId' : ''})
              AND
              c."isTempSlot" = FALSE AND 
              c.id NOT IN (
                (SELECT cu."truckId" FROM "carUnits" AS cu WHERE cu."isActive" = TRUE AND cu."dateRange" && :dateRange::tstzrange AND cu."truckId" NOTNULL${ carUnitId ? ' AND cu.id<> :carUnitId' : ''}) 
                UNION
                (SELECT cu."trailerId" FROM "carUnits" AS cu WHERE cu."isActive" = TRUE AND cu."dateRange" && :dateRange::tstzrange AND cu."trailerId" NOTNULL${ carUnitId ? ' AND cu.id<> :carUnitId' : ''})
                UNION 
                (SELECT cws."carId" FROM "carWorkSchedules" AS cws WHERE cws."dateRange" && :dateRange::tstzrange AND cws."carId" NOTNULL)
                UNION
                (SELECT cws."trailerId" FROM "carWorkSchedules" AS cws WHERE cws."dateRange" && :dateRange::tstzrange AND cws."trailerId" NOTNULL)
                )
                ORDER BY "listItem"
        `, {
      replacements: { dateRange, carUnitId, truckId, trailerId },
      model: Car
    })
    return res
  } catch (e) {
    throw new Error(`Ошибка запроса freeCars: ${e}`)
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
    if (args.carId && await searchCross(args.carId, args.dateRange, Order)) throw new Error('Пересечение с рейсом!')
    if (args.carId && await searchCross(args.carId, args.dateRange, CarWorkSchedule)) throw new Error('Пересечение! Транспортное средство недоступно. Сервис или выходной')
    const newCarSchedule = await CarWorkSchedule.create(args)
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: newCarSchedule })
    logOperation('carWorkSchedule', newCarSchedule.id, 'create', newCarSchedule, me.id)
    return newCarSchedule
  } catch (e) {
    throw new Error(`Ошибка создания записи CarWorkSchedule, ${e}`)
  }
}
export const updateCarWorkSchedule = async (_, { id, dateRange, carId, trailerId, driverId, title, note, type }, { models: { CarWorkSchedule, Order }, me }) => {
  try {
    dateRange = parseDateRange(dateRange)
    if (!!carId && await searchCross(carId, dateRange, Order)) throw new Error('Пересечение с рейсом!')
    if (!!carId && await searchCrossExistOrder(carId, dateRange, CarWorkSchedule, id)) throw new Error('Пересечение! Транспортное средство недоступно. Сервис или выходной')
    const updatedCarSchedule = await CarWorkSchedule.findByPk(id)
    await updatedCarSchedule.update({
      dateRange,
      type,
      carId: carId || null,
      trailerId: trailerId || null,
      driverId: driverId || null,
      title: title || null,
      note: note || null
    })
    pubsub.publish('updatedCarWorkSchedule', { updatedCarWorkSchedule: updatedCarSchedule })
    logOperation('carWorkSchedule', id, 'update', updatedCarSchedule, me.id)
    return updatedCarSchedule
  } catch (e) {
    throw new Error(`Ошибка обновления записи CarWorkSchedule: ${e}`)
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
    throw new Error(`Ошибка поиска в таблице "CarWorkSchedule": ${e} `)
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
    throw new Error(`Ошибка запроса carWorkSchedulePages, ${e}`)
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



export const carUnit = async (_, { date, truckId }, { models: { CarUnit } }) => {
  try {
    const carUnit = await getCarUnitFields(truckId, date)
    return carUnit
  } catch (e) {
    throw new Error('Ошибка запроса CarUnit', e.message)
  }
}


