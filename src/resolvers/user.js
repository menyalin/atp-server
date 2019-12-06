import {
  signupUser, signinUser, getCurrentUser, getAllUsers, isExistEmail, addMyPhone, getMyPhone, deleteMyPhone, updateMyPhone,
  createRole, getUserRoles, staff, updateSchedule, scheduleForVuex
} from '../controllers/user'
import { pubsub } from '../pubsub'

export default {
  Query: {
    getCurrentUser,
    scheduleForVuex,
    getAllUsers,
    isExistEmail,
    staff,
    userPhones: getMyPhone
  },
  User: {
    roles: getUserRoles
  },
  Subscription: {
    scheduleUpdated: {
      subscribe: () => pubsub.asyncIterator([ 'scheduleUpdated' ])
    }
  },
  Mutation: {
    createRole,
    signinUser,
    signupUser,
    addMyPhone,
    deleteMyPhone,
    updateMyPhone,
    updateSchedule
  }
}
