import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'

export type UpdateBatchProductsInput = ProductEntity[]
export type UpdateBatchProductsOutput = void
export type UpdateBatchProductsDependencies = {
  productAPIRepository: ProductAPIGateway
}
