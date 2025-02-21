import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'

export type AssociateChildCompaniesWithParentOutput = void

export type AssociateChildCompaniesWithParentDependecies = {
  companyRepository: CompanyGateway
}
