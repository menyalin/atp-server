import {
  carsForVuex, freeCars, createCar, updateCar,
  createCarWorkSchedule, carWorkScheduleForVuex, carWorkSchedulePage, updateCarWorkSchedule, deleteCarWorkSchedule,
  createCarUnit, updateCarUnit, deleteCarUnit, carUnit
} from '../controllers/cars'
import { carUnitForVuex, carUnitsPage } from '../controllers/cars/carUnit'

import { pubsub } from '../pubsub'

export default {
  Query: {
    carsForVuex,
    freeCars,

    carWorkScheduleForVuex,
    carWorkSchedulePage,

    carUnit,
    carUnitsPage,
    carUnitForVuex
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
