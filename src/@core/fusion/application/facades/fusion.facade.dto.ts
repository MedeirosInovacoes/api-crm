import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'

export interface IFusionFacade {
  findAllDeliveryDetail(input: FindAllDeliveryDetailInput): Promise<FindAllDeliveryDetailOutput>
}
