import { ProductDBGatewayFindAllOutput } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway.dto'

export type ProductDBGateway = {
  findAll(): Promise<ProductDBGatewayFindAllOutput>
}
