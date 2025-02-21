import { DeliveryDetailEntity } from '@/@core/fusion/domain/entities/delivery-detail/delivery-detail.entity'

export type FusionDeliveriesDetailsRepositoryInput = {
  ordersId: number[]
}

export type FusionDeliveriesDetailsRepositoryOutput = DeliveryDetailEntity[] | []
