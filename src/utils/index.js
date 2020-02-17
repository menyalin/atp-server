import { Journal } from '../models/journal'
import { Op } from 'sequelize'
import moment from 'moment'

export const logOperation = (documentType, documentId, operationType, document, userId) => {
  Journal.create({
    documentType,
    operationType,
    documentId,
    document,
    userId
  })
}
export const datePreparation = (date) => {
  const format = 'YYYY-MM-DD HH:mm'
  if (date) {
    const dateMoment = moment(+date)
    if (dateMoment._isValid) {
      return dateMoment.format(format)
    } else return date
  } else null
}

export const parseDateRange = (dateRange) => {
  const regExp = /^\[(2[\d\s-:\+]+),(2[\d\s-:\+]+)[\]|\)]$/
  if (dateRange.match(regExp).length !== 3) throw new Error('Ошибка формата dateRange')
  return [
    { value: new Date(dateRange.match(regExp)[1]), inclusive: true },
    { value: new Date(dateRange.match(regExp)[2]), inclusive: true }
  ]
}

export const searchCross = async (carId, dateRange, model) => {
  const cross = await model.findOne({
    where: {
      carId: carId,
      dateRange: {
        [Op.overlap]: dateRange
      }
    }
  })
  return !!cross
}

export const searchCrossExistOrder = async (carId, dateRange, model, orderId) => {
  const cross = await model.findOne({
    where: {
      id: {
        [Op.ne]: orderId
      },
      carId: carId,
      dateRange: {
        [Op.overlap]: dateRange
      }
    }
  })
  return !!cross
}