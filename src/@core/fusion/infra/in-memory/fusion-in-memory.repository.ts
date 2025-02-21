import { DeliveryDetailFakeBuilder } from '@/@core/fusion/domain/builders/delivery-detail-fake/delivery-detail-fake.builder'
import { DeliveryDetailEntity } from '@/@core/fusion/domain/entities/delivery-detail/delivery-detail.entity'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'
import {
  FusionDeliveriesDetailsRepositoryInput,
  FusionDeliveriesDetailsRepositoryOutput,
} from '@/@core/fusion/infra/repository/fusion.repository.dto'

export class FusionInMemoryRepository implements FusionDBGateway {
  findAllDeliveriesDetails = async (
    input: FusionDeliveriesDetailsRepositoryInput,
  ): Promise<FusionDeliveriesDetailsRepositoryOutput> => {
    const response: DeliveryDetailEntity[] = []
    for (const orderId of input.ordersId) {
      response.push(DeliveryDetailFakeBuilder.aDeliveryDetail().withOrderId(orderId).build())
    }

    return response
  }
}
