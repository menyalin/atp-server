import mongoose from 'mongoose'

export const allContracts = async (_, args, { models: { Contract } }) => {
  const allContracts = await Contract.find().populate({ path: 'partners', ref: 'Company' })
  return allContracts
}
export const myContracts = async (_, args, { models: { Contract, Company }, me }) => {
  if (me && me._id) {
    try {
      const myCompanies = await Company.find({ $or: [{ admins: me._id }, { users: me._id }] }, { _id: 1 })
      
      
      return myContracts
    } catch (e) {
      throw new Error(e)
    }
  } else {
    throw new Error('auth_error')
  }
}

export const newContract = async (_, { type, partners, isMain, date }, { models: { Contract }, me }) => {
  if (me && me._id) {
    try {
      const newContract = new Contract({
        type,
        partners,
        isMain,
        date,
        manager: me._id
      })
      await newContract.save()
      return newContract
    } catch (e) {
      throw new Error(e)
    }
  } else {
    throw new Error('auth_error')
  }
}
