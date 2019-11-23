export const carPage = async (_, { offset, limit }, { models: { Car } }) => {
  let searchQuery = {
    isActive: true
  }
  const res = await Car.findAndCountAll({
    where: searchQuery,
    offset,
    limit,
    order: [ 'id' ]
  })
  return {
    cars: res.rows,
    totalCar: res.count
  }
}

export const createCar = async (_, args, { models: { Car } }) => {
  try {
    const data = await Car.create(args)
    console.log(data)
    return data
  } catch (e) {
    throw new Error('Ошибка создания записи Car')
  }

} 