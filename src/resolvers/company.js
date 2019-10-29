import { addNewCompany, getAllCompanies, getMyCompanies, detailCompanyInfo } from '../controllers/company'

export default {
  Query: {
    getAllCompanies,
    getMyCompanies,
    detailCompanyInfo
  },
  Mutation: {
    addNewCompany
  }
}
