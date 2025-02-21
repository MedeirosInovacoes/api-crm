import { CreateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/create-batch-products/create-batch-products.usecase'
import { UpdateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/update-batch-products/update-batch-products.usecase'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductDBGateway } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway'

export type TProcessProductsDependencies = {
  productDBRepository: ProductDBGateway
  productAPIRepository: ProductAPIGateway
  createBatchProductsUseCase: CreateBatchProductsUseCase
  updateBatchProductsUseCase: UpdateBatchProductsUseCase
}

export type TProcessProductsOutput = void
