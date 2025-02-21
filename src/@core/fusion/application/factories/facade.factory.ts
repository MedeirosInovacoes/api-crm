import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { FindAllDeliveryDetailUseCase } from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.usecase'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'

export class FusionFacadeFactory {
  static create = ({ fusionDBRepository }: CreateFusionFacadeFactoryInput) => {
    const deliveryDetailUseCase = new FindAllDeliveryDetailUseCase(fusionDBRepository)
    return new FusionFacade(deliveryDetailUseCase)
  }
}

export type CreateFusionFacadeFactoryInput = {
  fusionDBRepository: FusionDBGateway
}
