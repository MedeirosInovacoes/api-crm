import { CrmFilterInput } from '@/@core/crm/@shared/application/filter/filter-input'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'

export type FindAllCompaniesInput = {
  filters: CrmFilterInput
}

export type FindAllCompaniesOutput = CompanyEntity[]

export type FindALlCompaniesDependecies = {
  companyRepository: CompanyGateway
}
