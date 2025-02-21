import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductModel } from '@/@core/crm/products/infra/winthor/typeorm/models/product.model'

export type ProductToDomainMapperInput = ProductModel
export type ProductToDomainMapperOutput = ProductEntity
