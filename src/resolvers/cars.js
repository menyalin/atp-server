import {
  carsForVuex, createCar, updateCar,
  createCarWorkSchedule, carWorkScheduleForVuex, updateCarWorkSchedule, deleteCarWorkSchedule,
  createCarUnit, updateCarUnit, carUnit, carUnitsPage
} from '../controllers/cars'
import { pubsub } from '../pubsub'

export default {
  Query: {
    carsForVuex,
    carWorkScheduleForVuex,

    carUnit,
    carUnitsPage
  },
  Mutation: {
    createCar,
    updateCar,
    createCarWorkSchedule,
    updateCarWorkSchedule,
    deleteCarWorkSchedule,
    createCarUnit,
    updateCarUnit
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
