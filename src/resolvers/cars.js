import {
  carsForVuex, createCar, updateCar,
  createCarWorkSchedule, carWorkScheduleForVuex, updateCarWorkSchedule, deleteCarWorkSchedule,
  createCarUnit
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
    deleteCarWorkSchedule,
    createCarUnit
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
    },
    carUnitUpdated: {
      subscribe: () => pubsub.asyncIterator('carUnitUpdated')
    }
  }
}
