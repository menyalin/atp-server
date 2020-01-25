import { Op } from 'sequelize'
import { pubsub } from '../pubsub'
import { parseDateRange } from '../utils'

export const orders = async (_, args, { models: { Order, Address } }) => {
  const data = await Order.findAll({
    include: [
      { model: Address, as: 'shipper' },
      { model: Address, as: 'consignee' }
    ]
  })
  return data
}
export const createOrder = async (_, args, { models: { Order } }) => {
  try {
    args.dateRange = parseDateRange(args.dateRange)
    const newOrder = await Order.create(args)
    pubsub.publish('orderAdded', { orderAdded: newOrder })
    return newOrder
  } catch (e) {
    throw new Error(e)
  }
}
export const orderPage = async (_, { offset, limit }, { models: { Order, User, Address, Car }, me }) => {
  try {
    const res = await Order.findAndCountAll({
      include: [
        { model: User, as: 'manager' },
        { model: Address, as: 'shipper' },
        { model: Address, as: 'consignee' },
        { model: Car, as: 'car' }
      ],
      offset,
      limit,
      order: [['number', 'DESC']]
    })
    return {
      orders: res.rows,
      orderCount: res.count
    }
  } catch (e) {
    throw new Error('Ошибка OrderPage: ', e.message)
  }
}
export const updateOrder = async (_, args, { models: { Order } }) => {
  const { id } = args
  delete args.id
  const updatedOrder = await Order.findByPk(id)
  await updatedOrder.update(args)
  pubsub.publish('orderUpdated', { orderUpdated: updatedOrder })
  return updatedOrder
}
export const ordersForVuex = async (_, { startDate, endDate }, { models: { Order } }) => {
  try {
    const res = await Order.findAll({
      where: {
        [Op.or]: [
          { confirmDate: null },
          {
            confirmDate: {
              [Op.gte]: new Date(startDate),
              [Op.lte]: new Date(endDate)
            }
          }]
      }
    })
    return res
  } catch (e) {
    throw new Error(e.message)
  }
}
export const orderTemplates = async (_, args, { models: { OrderTemplate } }) => {
  const res = await OrderTemplate.findAll({
    where: {
      isActive: true
    }
  })
  return res
}
export const createOrderTemplate = async (_, args, { models: { OrderTemplate } }) => {
  const newTemplate = await OrderTemplate.create(args)
  pubsub.publish('orderTemplateUpdated', { orderTemplateUpdated: newTemplate })
  return newTemplate
}
export const updateTemplate = async (_, args, { models: { OrderTemplate } }) => {
  const templateId = args.id
  delete args.id
  const updatedTemplate = await OrderTemplate.findByPk(templateId)
  await updatedTemplate.update(args)
  pubsub.publish('orderTemplateUpdated', { orderTemplateUpdated: updatedTemplate })
  return updatedTemplate
}
