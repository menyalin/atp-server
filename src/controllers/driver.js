import { Op } from 'sequelize'
import { pubsub } from '../pubsub'
import { logOperation } from '../utils'

export const createDriver = async (_, args, { models: { Driver }, me }) => {
    try {
        const newDriver = await Driver.create(args)
        pubsub.publish('driverUpdated', { driverUpdated: newDriver })
        logOperation('driver', newDriver.id, 'create', newDriver, me.id)
        return newDriver
    } catch (e) {
        throw new Error('Ошибка создания "Driver": ', e.message)
    }
}
export const driversForVuex = async (_, args, { models: { Driver } }) => {
    try {
        const allDrivers = await Driver.findAll()
        return allDrivers
    } catch (e) {
        throw new Error('Ошибка запроса "driverForVuex": ', e.message)
    }
}
export const updateDriver = async (_, args, { models: { Driver }, me }) => {
    try {
        const { id } = args
        delete args.id
        const driver = await Driver.findByPk(id)
        await driver.update(args)
        pubsub.publish('driverUpdated', { driverUpdated: driver })
        logOperation('driver', id, 'update', driver, me.id)
        return driver
    } catch (e) {
        throw new Error('Ошибка обновления "Driver": ', e.message)
    }
}
export const deleteDriver = async (_, { id }, { models: { Driver }, me }) => {
    try {
        const driver = await Driver.findByPk(id)
        driver.isActive = false
        pubsub.publish('driverDeleted', { driverDeleted: driver })
        await driver.save()
        logOperation('driver', id, 'delete', driver, me.id)
        return true
    } catch (e) {
        throw new Error('Ошибка удаления "Driver": ', e.message)
    }
}