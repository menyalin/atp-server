import {
  carsForVuex, createCar, updateCar,
  createCarWorkSchedule, carWorkScheduleForVuex, updateCarWorkSchedule, deleteCarWorkSchedule
} from '../controllers/cars'
import { pubsub } from '../pubsub'

export default {
  Query: {
    carsForVuex,
    carWorkScheduleForVuex
  },
  Mutation: {
    createCar,
    updateCar,
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
    },
    carUpdated: {
      subscribe: () => pubsub.asyncIterator('carUpdated')
    }
  }
}
