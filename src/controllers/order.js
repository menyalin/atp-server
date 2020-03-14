import { Op } from 'sequelize'
import { pubsub } from '../pubsub'
import { getCarUnitFields } from './cars/index.js'
import { parseDateRange, searchCross, searchCrossExistOrder, logOperation, datePreparation } from '../utils'

export const orders = async (_, args, { models: { Order, Address } }) => {
  const data = await Order.findAll({
    include: [
      { model: Address, as: 'shipper' },
      { model: Address, as: 'consignee' }
    ]
  })
  return data
}
export const createOrder = async (_, args, { models: { Order, CarWorkSchedule }, me }) => {
  try {
    args.dateRange = parseDateRange(args.dateRange)
    if (!!args.carId) {
      if (await searchCross(args.carId, args.dateRange, Order)) throw new Error('Пересечение с другими рейсами')
      if (await searchCross(args.carId, args.dateRange, CarWorkSchedule)) throw new Error('Транспортное средство недоступно. Сервис или выходной')
    }
    const newOrder = await Order.create(args)
    pubsub.publish('orderAdded', { orderAdded: newOrder })
    logOperation('order', newOrder.id, 'create', newOrder, me.id)
    return newOrder
  } catch (e) {
    throw new Error(e)
  }
}
export const orderPage = async (_, { offset, limit }, { models: { Order, Address, Car }, me }) => {
  try {
    const res = await Order.findAndCountAll({
      include: [
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
export const updateOrder = async (_, args, { models: { Order, CarWorkSchedule }, me }) => {
  const { id } = args
  delete args.id
  args.dateRange = parseDateRange(args.dateRange)
  args.plannedShippingDate = datePreparation(args.plannedShippingDate)
  args.plannedDeliveryDate = datePreparation(args.plannedDeliveryDate)
  args.loadingStart = datePreparation(args.loadingStart)
  args.loadingEnd = datePreparation(args.loadingEnd)
  args.unLoadingStart = datePreparation(args.unLoadingStart)
  args.unLoadingEnd = datePreparation(args.unLoadingEnd)
  if (!!args.carId) {
    if (await searchCrossExistOrder(args.carId, args.dateRange, Order, id)) throw new Error('Пересечение с другими рейсами')
    if (await searchCross(args.carId, args.dateRange, CarWorkSchedule)) throw new Error('Транспортное средство недоступно. Сервис или выходной')
  }
  const updatedOrder = await Order.findByPk(id)
  await updatedOrder.update(args)
  pubsub.publish('orderUpdated', { orderUpdated: updatedOrder })
  logOperation('order', id, 'update', updatedOrder, me.id)
  return updatedOrder
}
export const confirmOrder = async (_, { id, carType, carId, dateRange }, { models: { Order, CarWorkSchedule }, me }) => {
  dateRange = parseDateRange(dateRange)
  if (!!carId) {
    if (await searchCrossExistOrder(carId, dateRange, Order, id)) throw new Error('Пересечение с другими рейсами')
    if (await searchCross(carId, dateRange, CarWorkSchedule)) throw new Error('Транспортное средство недоступно. Сервис или выходной')
  }
  const updatedOrder = await Order.findByPk(id)
  const carUnitFields = await getCarUnitFields(carId, dateRange[0].value)
  await updatedOrder.update({
    carType,
    carId,
    dateRange,
    ...carUnitFields
  })
  await updatedOrder.reload()
  pubsub.publish('orderUpdated', { orderUpdated: updatedOrder })
  logOperation('order', id, 'confirm', updatedOrder, me.id)
  return updatedOrder
}
export const deleteOrder = async (_, { id }, { models: { Order }, me }, ) => {
  try {
    const order = await Order.findByPk(id)
    order.isActive = false
    await order.save()
    pubsub.publish('orderDeleted', { orderDeleted: order })
    logOperation('order', id, 'delete', order, me.id)
    return order
  } catch (e) {
    throw new Error("Ошибка удаления Order", e.message)
  }
}

export const ordersForVuex = async (_, { startDate, endDate }, { models: { Order } }) => {
  try {
    const res = await Order.findAll({
      where: {
        isActive: true,
        dateRange: {
          [Op.overlap]: parseDateRange(`[${startDate} 00:00,${endDate} 23:59]`)
        }
      }
    })
    return res
  } catch (e) {
    throw new Error("Ошибка запроса ordersForVuex", e.message)
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
export const deleteOrderTemplate = async (_, { id }, { models: { OrderTemplate } }) => {
  try {
    const item = await OrderTemplate.findByPk(id)
    await item.destroy()
    pubsub.publish('orderTemplateDeleted', { orderTemplateDeleted: id })
    return true
  } catch (e) {
    throw new Error('Ошибка удаления OrderTemplate')
  }
}