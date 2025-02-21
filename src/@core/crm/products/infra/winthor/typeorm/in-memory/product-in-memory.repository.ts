import { theProducts } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductDBGateway } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway'
import { ProductDBGatewayFindAllOutput } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway.dto'

export class ProductDBInMemoryRepository implements ProductDBGateway {
  items: ProductEntity[] = theProducts(200).build()

  findAll = async (): Promise<ProductDBGatewayFindAllOutput> => {
    return Promise.resolve(this.items)
  }
}
