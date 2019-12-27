import {
  carPage, createCar, cars, filteredCars, carById, carsForVuex, createCarWorkSchedule, carWorkScheduleForVuex,
  updateCarWorkSchedule
} from '../controllers/cars'
import { pubsub } from '../pubsub'

export default {
  Query: {
    carPage,
    cars,
    filteredCars,
    carById,
    carsForVuex,
    carWorkScheduleForVuex
  },
  Mutation: {
    createCar,
    createCarWorkSchedule,
    updateCarWorkSchedule
  },
  Subscription: {
    updatedCarWorkSchedule: {
      subscribe: () => pubsub.asyncIterator('updatedCarWorkSchedule')
    }
  }
}
