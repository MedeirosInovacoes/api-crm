import { FindAllDeliveryDetailUseCase } from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.usecase'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'
import { FUSION_REPOSITORY_PROVIDERS } from '@/nest-modules/fusion-module/providers/fusion.repository.provider'

const findAllDeliveryDetailUseCase = {
  provide: FindAllDeliveryDetailUseCase,
  useFactory: (fusionDBRepository: FusionDBGateway) => {
    return new FindAllDeliveryDetailUseCase(fusionDBRepository)
  },
  inject: [FUSION_REPOSITORY_PROVIDERS.FUSION_DB_REPOSITORY.provide],
}

export const FUSION_USECASE_PROVIDERS = {
  FIND_ALL_DELIVERY_DETAIL_USECASE: findAllDeliveryDetailUseCase,
}
