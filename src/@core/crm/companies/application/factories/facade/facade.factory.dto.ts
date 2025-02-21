import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'

export type CompanyFacadeFactoryCreateInput = {
  companyRepository: CompanyGateway
}

export type CompanyFacadeFactoryCreateOutput = CompanyFacade
