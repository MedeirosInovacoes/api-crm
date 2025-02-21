import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'
import { DelivevryDetailInfraMapper } from '@/@core/fusion/infra/mappers/delivery-detail-infra.mapper'
import { FusionEventModel } from '@/@core/fusion/infra/models/fusion-events.model'
import { In, Repository } from 'typeorm'

export class FusionDBRepository implements FusionDBGateway {
  constructor(private readonly fusionRepository: Repository<FusionEventModel>) {}

  findAllDeliveriesDetails = async ({
    ordersId,
  }: FindAllDeliveryDetailInput): Promise<FindAllDeliveryDetailOutput> => {
    try {
      const response = await this.fusionRepository.find({
        where: {
          SEQ_PEDIDO_ERP: In(ordersId),
          TIPO: '7',
        },
      })

      return response.map((item) =>
        DelivevryDetailInfraMapper.toDomain({
          data_hora_atualizacao: item.DATAHORA.toISOString(),
          pedido_erp: item.SEQ_PEDIDO_ERP,
          id: item.ID_PK.toString(),
        }),
      )
    } catch (error) {
      console.error('Error in deliveryDetail:')
    }
  }
}
