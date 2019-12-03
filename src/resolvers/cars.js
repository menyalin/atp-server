import { carPage, createCar, cars, filteredCars, carById, carsForVuex } from '../controllers/cars'

export default {
  Query: {
    carPage,
    cars,
    filteredCars,
    carById,
    carsForVuex
  },
  Mutation: {
    createCar
  }
}
