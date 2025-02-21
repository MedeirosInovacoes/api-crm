import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'
import {
  TProductFacadeFactoryCreateInput,
  TProductFacadeFactoryCreateOutput,
} from '@/@core/crm/products/application/factories/facade/facade.factory.dto'
import { FindAllProductsUseCase } from '@/@core/crm/products/application/usecases/find-all-products/find-all-products.usecase'
import { ProductAPIRepository } from '@/@core/crm/products/infra/hubspot/repository/product-api.repository'

export class ProductFacadeFactory {
  static create(input: TProductFacadeFactoryCreateInput): TProductFacadeFactoryCreateOutput {
    const productAPIRepository = new ProductAPIRepository({
      crmRepository: input.crmRepository,
    })
    const findAllProductsUseCase = new FindAllProductsUseCase({
      productAPIRepository,
    })

    return new ProductFacade({
      findAllProductsUseCase,
    })
  }
}
