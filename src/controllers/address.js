import { Op } from 'sequelize'

export const createAddress = async (_, {
  partner,
  address,
  shortName,
  note,
  isShippingPlace,
  isDeliveryPlace
}, { models: { Address } }) => {
  try {
    const newAddress = await Address.create({ partner, address, shortName, note, isShippingPlace, isDeliveryPlace })
    return newAddress
  } catch (e) {
    throw new Error('Ошибка создания записи Address')
  }
}

export const allAddresses = async (_, args, { models: { Address } }) => {
  const addresses = await Address.findAll({})
  return addresses
}

export const addressById = async (_, { id }, { models: { Address } }) => {
  const address = await Address.findOne({
    where: { id }
  })
  return address
}


export const filteredAddresses = async (_, { filter, type }, { models: { Address } }) => {
  const searchQuery = {
    isActive: true,
    [ Op.or ]: [
      { shortName: { [ Op.iRegexp ]: filter } },
      { partner: { [ Op.iRegexp ]: filter } },
      { address: { [ Op.iRegexp ]: filter } },
      { note: { [ Op.iRegexp ]: filter } },
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
      isActive: true,
      ...searchQuery
    },
    limit: 15
  })
  return result
}

export const addressPages = async (_, { offset, limit }, { models: { Address } }) => {
  const res = await Address.findAndCountAll({
    offset,
    limit
  })
  return {
    addresses: res.rows,
    totalCount: res.count
  }
}
