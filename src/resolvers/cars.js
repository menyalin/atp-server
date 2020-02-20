import {
  carsForVuex, createCar, updateCar,
  createCarWorkSchedule, carWorkScheduleForVuex, carWorkSchedulePage, updateCarWorkSchedule, deleteCarWorkSchedule,
  createCarUnit, updateCarUnit, deleteCarUnit, carUnit, carUnitsPage
} from '../controllers/cars'
import { pubsub } from '../pubsub'

export default {
  Query: {
    carsForVuex,
    carWorkScheduleForVuex,
    carWorkSchedulePage,

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
    updateCarUnit,
    deleteCarUnit
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
