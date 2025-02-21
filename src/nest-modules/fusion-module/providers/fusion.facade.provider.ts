import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { FusionFacadeFactory } from '@/@core/fusion/application/factories/facade.factory'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'
import { FUSION_REPOSITORY_PROVIDERS } from '@/nest-modules/fusion-module/providers/fusion.repository.provider'

const fusionFacadeProvider = {
  provide: FusionFacade,
  useFactory: (fusionDBRepository: FusionDBGateway) => {
    return FusionFacadeFactory.create({ fusionDBRepository })
  },
  inject: [FUSION_REPOSITORY_PROVIDERS.FUSION_DB_REPOSITORY.provide],
}

export const FUSION_FACADE_PROVIDERS = {
  FUSION_FACADE: fusionFacadeProvider,
}
