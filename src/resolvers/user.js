import {
  signupUser, signinUser, getCurrentUser, getAllUsers, isExistEmail, addMyPhone, getMyPhone, deleteMyPhone, updateMyPhone,
  createRole, getUserRoles, staff,
  scheduleForVuex
} from '../controllers/user'

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
  Mutation: {
    createRole,
    signinUser,
    signupUser,
    addMyPhone,
    deleteMyPhone,
    updateMyPhone
  }
}
