import { carPage, createCar, cars } from '../controllers/cars'

export default {
  Query: {
    carPage,
    cars
  },
  Mutation: {
    createCar

  }
}
