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

export const allAddresses = async (_, args, context) => {
  return null
}
