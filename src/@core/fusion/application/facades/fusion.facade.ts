import { IFusionFacade } from '@/@core/fusion/application/facades/fusion.facade.dto'
import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'
import { FindAllDeliveryDetailUseCase } from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.usecase'

export class FusionFacade implements IFusionFacade {
  constructor(private readonly findAllDeliveryDetailUseCase: FindAllDeliveryDetailUseCase) {}

  findAllDeliveryDetail = async (
    input: FindAllDeliveryDetailInput,
  ): Promise<FindAllDeliveryDetailOutput> => {
    return this.findAllDeliveryDetailUseCase.execute(input)
  }
}
