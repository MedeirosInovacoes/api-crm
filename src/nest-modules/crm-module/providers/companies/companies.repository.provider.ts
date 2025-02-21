import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { CompanyHubSpotRepository } from '@/@core/crm/companies/infra/hubspot/repository/company.respository'
import { CRM_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/crm.repositories.provider'

const companyRepositoryProvider = {
  provide: 'CompanyGateway',
  useExisting: CompanyHubSpotRepository,
}

const companyHubSpotRepositoryProvider = {
  provide: CompanyHubSpotRepository,
  useFactory: (crmRepository: CrmGatewayInterface) => new CompanyHubSpotRepository(crmRepository),
  inject: [CRM_REPOSITORY_PROVIDERS.CRM_REPOSITORY.provide],
}
export const COMPANIES_REPOSITORY_PROVIDERS = {
  COMPANY_REPOSITORY: companyRepositoryProvider,
  COMPANY_HUBSPOT_REPOSITORY: companyHubSpotRepositoryProvider,
}
