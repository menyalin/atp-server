import { signupUser, signinUser, getCurrentUser, getAllUsers, isExistEmail, addMyPhone, getMyPhone, deleteMyPhone, updateMyPhone } from '../controllers/user'

export default {
  Query: {
    getCurrentUser,
    getAllUsers,
    isExistEmail,
    userPhones: getMyPhone
  },
  Mutation: {
    signinUser,
    signupUser,
    addMyPhone,
    deleteMyPhone,
    updateMyPhone
  }
}
