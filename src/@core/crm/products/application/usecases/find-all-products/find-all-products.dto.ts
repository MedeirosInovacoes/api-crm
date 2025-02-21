import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'

export type TFindAllProductsOutput = ProductEntity[]
export type TFindAllProductsDependencies = {
  productAPIRepository: ProductAPIGateway
}
