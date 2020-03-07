import { Op } from 'sequelize'
import { parseDateRange, searchCross, searchCrossExistOrder, logOperation, UnixDateRangeToStr } from '../../utils'
import { pubsub } from '../../pubsub'

export const carUnitForVuex = async (_, { startDate, endDate }, { models: { CarUnit } }) => {
    try {
        const res = CarUnit.findAll({
            where: {
                isActive: true,
                dateRange: {
                    [Op.overlap]: parseDateRange(`[${startDate} 00:00,${endDate} 23:59]`)
                }
            }
        })
        return res
    } catch (e) {
        throw new Error(`Ошибка поиска в таблице "CarUnit": ${e} `)
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

export const createCarUnit = async (_, args, { models: { CarUnit }, me }) => {
    if (!me) throw new Error("Ошибка авторизации!!, токен не действителен")
    try {
        args.dateRange = parseDateRange(args.dateRange)
        const crossRecords = await crossCarUnitExist(args)
        if (crossRecords) throw new Error('Пересечение записей')
        const data = await CarUnit.create(args)
        pubsub.publish('carUnitUpdated', { carUnitUpdated: data })
        logOperation('carUnit', data.id, 'create', data, me.id)
        return data
    } catch (e) {
        throw new Error('Ошибка создания CarUnit', e.message)
    }
}

export const updateCarUnit = async (_, { id, dateRange, truckId, trailerId, driver1Id, driver2Id, note }, { models: { CarUnit }, me }) => {
    if (!me) throw new Error("Ошибка авторизации!!, токен не действителен")
    try {
        dateRange = parseDateRange(dateRange)
        const crossRecords = await crossCarUnitExist({ id, dateRange, truckId, trailerId, driver1Id, driver2Id })
        if (crossRecords) throw new Error('Пересечение записей')
        const carUnit = await CarUnit.findByPk(id)
        await carUnit.update({ dateRange, truckId, trailerId: trailerId || null, driver2Id: driver2Id || null, driver1Id, note: note || null })
        pubsub.publish('carUnitUpdated', { carUnitUpdated: carUnit })
        logOperation('carUnit', id, 'update', carUnit, me.id)
        return carUnit
    } catch (e) {
        throw new Error(`Ошибка обновления CarUnit: ${e}`)
    }
}
export const deleteCarUnit = async (_, { id }, { models: { CarUnit }, me }) => {
    try {
        const carUnit = await CarUnit.findByPk(id)
        carUnit.isActive = false
        await carUnit.save()
        pubsub.publish('carUnitDeleted', { carUnitDeleted: id })
        logOperation('carUnit', id, 'delete', carUnit, me.id)
        return id
    } catch (e) {
        throw new Error('Ошибка удаления CarUnit', e.message)
    }
}