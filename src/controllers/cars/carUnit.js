import { Op } from 'sequelize'
import { parseDateRange, searchCross, searchCrossExistOrder, logOperation, UnixDateRangeToStr } from '../../utils'

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