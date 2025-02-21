import { TFindAllProductsOutput } from '@/@core/crm/products/application/usecases/find-all-products/find-all-products.dto'
import { FindAllProductsUseCase } from '@/@core/crm/products/application/usecases/find-all-products/find-all-products.usecase'

export type TProductFacadeFindAll = TFindAllProductsOutput

export type TProductFacade = {
  findAll(): Promise<TProductFacadeFindAll>
}

export type TProductFacadeDependencies = {
  findAllProductsUseCase: FindAllProductsUseCase
}
