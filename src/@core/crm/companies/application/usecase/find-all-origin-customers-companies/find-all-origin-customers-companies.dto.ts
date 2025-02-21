import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'

export type TFindAllOriginCustomersCompaniesInput = {
  fields: string[]
}

export type TFindAllOriginCustomersCompaniesOutput = {
  id: string
  customerCode: number
  originalSource: string
  originalInDepthSource1: string
  originalInDepthSource2: string
}

export type TFindAllOriginCustomersCompaniesDependencies = {
  companyRepository: CompanyGateway
}
