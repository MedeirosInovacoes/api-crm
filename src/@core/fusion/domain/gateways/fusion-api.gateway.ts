import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'

export type FusionAPIGateway = {
  getDeliveryDetail(input: FindAllDeliveryDetailInput): Promise<FindAllDeliveryDetailOutput>
}
