export const orders = async (_, args, { models: { Order, User, Address } }) => {

    const data = await Order.findAll({
        include: [
            { model: User, as: "manager" },
            { model: Address, as: "shipper" },
            { model: Address, as: "consignee" }
        ]
    })
    return data

}

export const createOrder = async (_, args, { models: { Order }, me }) => {
    const newOrder = await Order.create({ ...args, managerId: me.id })
    return newOrder
}       