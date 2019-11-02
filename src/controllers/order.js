

export const allOrders = async (_, args, { models: { Order } }) => {
  const allOrders = await Order.find()
  return allOrders
}
