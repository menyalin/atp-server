import {
  signupUser, signinUser, getCurrentUser, getAllUsers, isExistEmail, changeUserStatus,
  createRole, getUserRoles, userRoles, updateSchedule, scheduleForVuex, usersForAdminPanel, changeDispatcherRole, createSchedule, deleteSchedule,
  deleteRole
} from '../controllers/user'
import { pubsub } from '../pubsub'

export default {
  Query: {
    getCurrentUser,
    usersForAdminPanel,
    scheduleForVuex,
    getAllUsers,
    isExistEmail,
    userRoles
  },
  User: {
    roles: getUserRoles
  },
  Subscription: {
    scheduleUpdated: {
      subscribe: () => pubsub.asyncIterator(['scheduleUpdated'])
    },
    updatedUserRoles: {
      subscribe: () => pubsub.asyncIterator(['updatedUserRoles'])
    },
    deletedUserRoles: {
      subscribe: () => pubsub.asyncIterator(['deletedUserRoles'])
    },
    deletedSchedule: {
      subscribe: () => pubsub.asyncIterator(['deletedSchedule'])
    }
  },
  Mutation: {
    createRole,
    deleteRole,

    signinUser,
    signupUser,

    createSchedule,
    updateSchedule,
    deleteSchedule,

    changeUserStatus,
    changeDispatcherRole
  }
}
