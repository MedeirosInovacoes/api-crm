import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'

export class FindAllDeliveryDetailUseCase {
  constructor(private readonly fusionRepository: FusionDBGateway) {}

  execute = async ({
    ordersId,
  }: FindAllDeliveryDetailInput): Promise<FindAllDeliveryDetailOutput> => {
    return await this.fusionRepository.findAllDeliveriesDetails({ ordersId })
  }
}
