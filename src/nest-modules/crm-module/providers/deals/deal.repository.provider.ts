import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { DealRepository } from '@/@core/crm/deals/infra/deal.repository'
import { CRM_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/crm.repositories.provider'

const dealRepositoryGateway = {
  provide: 'DealGateway',
  useExisting: DealRepository,
}

const dealRepositoryProvider = {
  provide: DealRepository,
  useFactory: (crmRepository: CrmGatewayInterface) => new DealRepository(crmRepository),
  inject: [CRM_REPOSITORY_PROVIDERS.CRM_REPOSITORY.provide],
}

export const DEAL_REPOSITORIES_PROVIDERS = {
  DEAL_GATEWAY: dealRepositoryGateway,
  DEAL_REPOSITORY: dealRepositoryProvider,
}
