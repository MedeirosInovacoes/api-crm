import {
  TProductFacade,
  TProductFacadeDependencies,
  TProductFacadeFindAll,
} from '@/@core/crm/products/application/facade/product/product.facade.dto'

export class ProductFacade implements TProductFacade {
  constructor(private dependencies: TProductFacadeDependencies) {}

  findAll(): Promise<TProductFacadeFindAll> {
    return this.dependencies.findAllProductsUseCase.execute()
  }
}
