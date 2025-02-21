import { DeliveryDetailEntity } from '@/@core/fusion/domain/entities/delivery-detail/delivery-detail.entity'

export type FindAllDeliveryDetailInput = {
  ordersId: number[]
}

export type FindAllDeliveryDetailOutput = DeliveryDetailEntity[]
