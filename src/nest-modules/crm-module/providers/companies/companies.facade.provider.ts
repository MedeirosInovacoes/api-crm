import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CompanyFacadeFactory } from '@/@core/crm/companies/application/factories/facade/facade.factory'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { COMPANIES_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.repository.provider'

const companiesFacadeProvider = {
  provide: 'CompanyFacadeInterface',
  useExisting: CompanyFacade,
}

const companiesFacadeFactoryProvider = {
  provide: CompanyFacade,
  useFactory: (companyRepository: CompanyGateway) =>
    CompanyFacadeFactory.create({ companyRepository }),
  inject: [COMPANIES_REPOSITORY_PROVIDERS.COMPANY_HUBSPOT_REPOSITORY.provide],
}

export const COMPANIES_FACADE_PROVIDERS = {
  COMPANY_FACADE: companiesFacadeProvider,
  COMPANY_FACADE_FACTORY: companiesFacadeFactoryProvider,
}
