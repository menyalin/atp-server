export const carPage = async (_, { offset, limit }, { models: { Car } }) => {
  const searchQuery = {
    isActive: true
  }
  const res = await Car.findAndCountAll({
    where: searchQuery,
    offset,
    limit,
    order: []
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

export const cars = async (_, { type }, { models: { Car } }) => {
  try {
    const res = Car.findAll({
      where: { type }
    })
    return res
  } catch (e) {
    throw new Error('Ошибка поиска в таблице "Cars"')
  }
}
