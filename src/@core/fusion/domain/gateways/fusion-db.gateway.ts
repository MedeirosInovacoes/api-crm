import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'

export type FusionDBGateway = {
  findAllDeliveriesDetails(input: FindAllDeliveryDetailInput): Promise<FindAllDeliveryDetailOutput>
}
