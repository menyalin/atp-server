export const createAddress = async (_, {
  partner,
  address,
  shortName,
  note,
  isShipmentPlace,
  isDeliveryPlace
}, { models: { Address }, me }) => {
  const newAddress = new Address({
    partner,
    address,
    shortName,
    note,
    isShipmentPlace,
    isDeliveryPlace
  })
  await newAddress.save()
  return newAddress
}

export const allAddresses = async (_, args, { models: { Address } }) => {
  const allAddresses = await Address.find()
  return allAddresses
}

export const filteredAddresses = async (_, { filter }, { models: { Address } }) => {
  const allAddresses = await Address.find({ $text: { $search: filter, $language: 'ru' } })
  return allAddresses
}
