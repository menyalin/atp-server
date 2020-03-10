import { Op } from 'sequelize'
import { pubsub } from '../pubsub'

export const createAddress = async (_, {
  partner,
  address,
  shortName,
  note,
  isShippingPlace,
  isDeliveryPlace
}, { models: { Address } }) => {
  try {
    const data = await Address.create({ partner, address, shortName, note, isShippingPlace, isDeliveryPlace })
    pubsub.publish('addressAdded', { addressAdded: data })
    return data
  } catch (e) {
    throw new Error('Ошибка создания записи Address')
  }
}

export const allAddresses = async (_, args, { models: { Address } }) => {
  const addresses = await Address.findAll({})
  return addresses
}

export const addressById = async (_, { id }, { models: { Address } }) => {
  const address = await Address.findByPk(id)
  return address
}

export const filteredAddresses = async (_, { filter, type }, { models: { Address } }) => {
  const searchQuery = {
    isActive: true,
    [Op.or]: [
      { shortName: { [Op.iRegexp]: filter } },
      { partner: { [Op.iRegexp]: filter } },
      { address: { [Op.iRegexp]: filter } },
      { note: { [Op.iRegexp]: filter } }
    ]
  }
  if (type === 'shippingPlace') {
    searchQuery.isShippingPlace = true
  }
  if (type === 'deliveryPlace') {
    searchQuery.isDeliveryPlace = true
  }
  const result = await Address.findAll({
    where: {
      ...searchQuery
    },
    limit: 50
  })
  return result
}

export const addressPages = async (_, { offset, limit, search, isDeliveryPlace, isShippingPlace }, { models: { Address } }) => {
  let searchQuery = {
    isActive: true
  }
  if (isShippingPlace) {
    searchQuery.isShippingPlace = true
  }
  if (isDeliveryPlace) {
    searchQuery.isDeliveryPlace = true
  }

  if (search) {
    searchQuery = Object.assign({}, searchQuery, {
      [Op.or]: [
        { shortName: { [Op.iRegexp]: search } },
        { partner: { [Op.iRegexp]: search } },
        { address: { [Op.iRegexp]: search } },
        { note: { [Op.iRegexp]: search } }
      ]
    })
  }
  const res = await Address.findAndCountAll({
    where: searchQuery,
    offset,
    limit,
    order: ['id']
  })
  return {
    addresses: res.rows,
    totalCount: res.count
  }
}

export const updateAddress = async (_, { id, address, partner, shortName, note, isShippingPlace, isDeliveryPlace, isActive }, { models: { Address } }) => {
  const adr = await Address.findByPk(id)
  await adr.update({ address, partner, shortName, note, isShippingPlace, isDeliveryPlace, isActive })
  pubsub.publish('addressUpdated', { addressUpdated: adr })
  return adr
}

export const blockAddress = async (_, { id }, { models: { Address } }) => {
  try {
    const adr = await Address.findByPk(id)
    await adr.update({ isActive: false })
    pubsub.publish('addressUpdated', { addressUpdated: adr })
    return true
  } catch (e) {
    return false
  }
}

export const addressesForVuex = async (_, args, { models: { Address } }) => {
  const addresses = await Address.findAll({})
  return addresses
}