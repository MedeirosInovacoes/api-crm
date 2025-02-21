import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'

export type TCreateBatchProductsInput = ProductEntity[]
export type TCreateBatchProductsOutput = void
export type TCreateBatchProductsDependencies = {
  productAPIRepository: ProductAPIGateway
}
