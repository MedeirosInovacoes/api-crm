import { ProductModel } from '@/@core/crm/products/infra/winthor/typeorm/models/product.model'
import { Repository } from 'typeorm'

export type TProductWinthorRepositoryDependencies = {
  productWinthorRepository: Repository<ProductModel>
}
