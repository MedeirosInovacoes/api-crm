import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'

export type UpdateBatchCompaniesInput = CompanyEntity[]
export type UpdateBatchCompaniesOutput = void

export type UpdateBatchCompaniesDependecies = {
  companyRepository: CompanyGateway
}
