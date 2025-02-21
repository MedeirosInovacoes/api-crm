import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export type UpdateBatchDealsSalesInputDto = {
  name: string
  limit: number
  order: OrderEntity
  deal: DealEntity
  products: ProductEntity[]
}[]

export type UpdateBatchDealsSalesOutputDto = void
