import { carPage, createCar, cars, filteredCars, carById } from '../controllers/cars'

export default {
  Query: {
    carPage,
    cars,
    filteredCars,
    carById
  },
  Mutation: {
    createCar
  }
}
