import { gql } from 'apollo-server-express'

export default gql`
type Company {
    _id: ID
    name: String
    fullName: String
    inn: String
    created: String
    isActive: Boolean
    admins: [User]
    users: [User]
}  
extend type Mutation {
   addNewCompany(name: String, fullName: String, inn: String): Company
  }
extend type Query {
  getAllCompanies: [Company]
  getMyCompanies: [Company]
  detailCompanyInfo(id: String!): Company
}

`
