import { DeliveryDetailEntity } from '@/@core/fusion/domain/entities/delivery-detail/delivery-detail.entity'

export class DelivevryDetailInfraMapper {
  static toDomain = (delivery: IDeliveryDetailReq): DeliveryDetailEntity => {
    return DeliveryDetailEntity.create({
      id: delivery.id,
      orderId: +delivery.pedido_erp,
      date: new Date(delivery.data_hora_atualizacao),
    })
  }
}

export type IDeliveryDetailReq = {
  id: string
  pedido_erp: string
  data_hora_atualizacao: string
}
