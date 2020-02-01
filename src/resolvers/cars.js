import {
  carPage, createCar, cars, filteredCars, carById, carsForVuex, createCarWorkSchedule, carWorkScheduleForVuex,
  updateCarWorkSchedule, deleteCarWorkSchedule
} from '../controllers/cars'
import { pubsub } from '../pubsub'

export default {
  Query: {
    carsForVuex,
    carWorkScheduleForVuex
  },
  Mutation: {
    createCar,
    createCarWorkSchedule,
    updateCarWorkSchedule,
    deleteCarWorkSchedule
  },
  Subscription: {
    updatedCarWorkSchedule: {
      subscribe: () => pubsub.asyncIterator('updatedCarWorkSchedule')
    },
    deletedCarWorkSchedule: {
      subscribe: () => pubsub.asyncIterator('deletedCarWorkSchedule')
    }
  }
}
