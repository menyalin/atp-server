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
  const regExp = /^\[(2[\d\s-:\+]+),([\d\s-:\+]*)\]$/
  const parsedRange = dateRange.match(regExp)
  if (parsedRange.length !== 3) throw new Error('Ошибка формата dateRange')
  else if (parsedRange[2]) return [
    { value: new Date(parsedRange[1]), inclusive: true },
    { value: new Date(parsedRange[2]), inclusive: true },
  ]
  else return [
    { value: new Date(parsedRange[1]), inclusive: true },
    null
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