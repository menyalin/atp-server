import {
  signupUser, signinUser, getCurrentUser, getAllUsers, isExistEmail, changeUserStatus,
  createRole, getUserRoles, staff, updateSchedule, scheduleForVuex, usersForAdminPanel, changeDispatcherRole
} from '../controllers/user'
import { pubsub } from '../pubsub'

export default {
  Query: {
    getCurrentUser,
    usersForAdminPanel,
    scheduleForVuex,
    getAllUsers,
    isExistEmail,
    staff,
  },
  User: {
    roles: getUserRoles
  },
  Subscription: {
    scheduleUpdated: {
      subscribe: () => pubsub.asyncIterator([ 'scheduleUpdated' ])
    },
    staffUpdated: {
      subscribe: () => pubsub.asyncIterator('staffUpdated')
    }
  },
  Mutation: {
    createRole,
    signinUser,
    signupUser,
    updateSchedule,
    changeUserStatus,
    changeDispatcherRole
  }
}
