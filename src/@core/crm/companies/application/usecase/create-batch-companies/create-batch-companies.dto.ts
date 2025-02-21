import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'

export type CreateBatchCompaniesInput = CompanyEntity[]

export type CreateBatchCompaniesOutput = CompanyEntity[]

export type CreateBatchCompaniesDependecies = {
  companyRepository: CompanyGateway
}
