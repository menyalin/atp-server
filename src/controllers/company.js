export const addNewCompany = async (_, { name, fullName, inn }, { models: { User, Company }, me }) => {
  const newCompany = new Company({
    name,
    fullName,
    inn
  })
  newCompany.admins.push(me._id)
  await newCompany.save()
  return newCompany
}

export const getAllCompanies = async (_, args, { models: { User, Company }, me }) => {
  const companies = await Company.find().populate({ path: 'users' }).populate({ path: 'admins' })
  return companies
}

export const getMyCompanies = async (_, args, { models: { User, Company }, me }) => {
  const myCompanies = await Company.find({ $or: [{ admins: me._id }, { users: me._id }] })
  return myCompanies
}

export const detailCompanyInfo = async (_, { id }, { models: { User, Company }, me }) => {
  const company = await Company.findOne({ _id: id }).populate({ path: 'users' }).populate({ path: 'admins' })
  return company
}
