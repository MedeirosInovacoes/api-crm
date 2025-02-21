import { CrmRepository } from '@/@core/crm/@shared/infra/repository/crm.repository'
import { Provider } from '@nestjs/common'

const crmRepositoryProvider: Provider = {
  provide: 'CrmGatewayInterface',
  useFactory: () => new CrmRepository(),
}

export const CRM_REPOSITORY_PROVIDERS = {
  CRM_REPOSITORY: crmRepositoryProvider,
}
