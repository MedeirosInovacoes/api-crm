import { CreateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/create-batch-products/create-batch-products.usecase'
import { ProcessProductsUseCase } from '@/@core/crm/products/application/usecases/process-products/process-products.usecase'
import { UpdateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/update-batch-products/update-batch-products.usecase'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductDBGateway } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway'
import { PRODUCTS_REPOSITORIES_PROVIDERS } from '@/nest-modules/crm-module/providers/products/product.repositories.provider'
import { Provider } from '@nestjs/common'

const createBatchProductsUseCase: Provider = {
  provide: CreateBatchProductsUseCase,
  useFactory: (productAPIRepository: ProductAPIGateway) =>
    new CreateBatchProductsUseCase({ productAPIRepository }),
  inject: [PRODUCTS_REPOSITORIES_PROVIDERS.PRODUCT_API_REPOSITORY.provide],
}

const updateBatchProductsUseCase: Provider = {
  provide: UpdateBatchProductsUseCase,
  useFactory: (productAPIRepository: ProductAPIGateway) =>
    new UpdateBatchProductsUseCase({ productAPIRepository }),
  inject: [PRODUCTS_REPOSITORIES_PROVIDERS.PRODUCT_API_REPOSITORY.provide],
}

const processProductsUseCase: Provider = {
  provide: ProcessProductsUseCase,
  useFactory: (
    productDBRepository: ProductDBGateway,
    productAPIRepository: ProductAPIGateway,
    createBatchProductsUseCase: CreateBatchProductsUseCase,
    updateBatchProductsUseCase: UpdateBatchProductsUseCase,
  ) =>
    new ProcessProductsUseCase({
      productDBRepository,
      productAPIRepository,
      createBatchProductsUseCase,
      updateBatchProductsUseCase,
    }),
  inject: [
    PRODUCTS_REPOSITORIES_PROVIDERS.PRODUCT_WINTHOR_REPOSITORY.provide,
    PRODUCTS_REPOSITORIES_PROVIDERS.PRODUCT_API_REPOSITORY.provide,
    createBatchProductsUseCase.provide,
    updateBatchProductsUseCase.provide,
  ],
}

export const PRODUCTS_USECASES_PROVIDERS = {
  CREATE_BATCH_PRODUCTS_USE_CASE: createBatchProductsUseCase,
  UPDATE_BATCH_PRODUCTS_USE_CASE: updateBatchProductsUseCase,
  PROCESS_PRODUCTS_USE_CASE: processProductsUseCase,
}
