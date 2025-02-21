import {
  TProcessProductsDependencies,
  TProcessProductsOutput,
} from '@/@core/crm/products/application/usecases/process-products/pocess-products.dto'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export class ProcessProductsUseCase {
  constructor(private dependencies: TProcessProductsDependencies) {}

  async execute(): Promise<TProcessProductsOutput> {
    const createProducts: ProductEntity[] = []
    const updateProducts: ProductEntity[] = []

    const [winthorProducts, crmProducts] = await Promise.all([
      this.dependencies.productDBRepository.findAll(),
      this.dependencies.productAPIRepository.findAll(),
    ])

    for (const product of winthorProducts) {
      const match = crmProducts.find((crm) => crm.productCode === product.productCode)

      if (!match) {
        createProducts.push(product)
      } else {
        updateProducts.push(product)
      }
    }

    if (createProducts.length > 0) {
      await this.dependencies.createBatchProductsUseCase.execute(createProducts)
    }

    if (updateProducts.length > 0) {
      await this.dependencies.updateBatchProductsUseCase.execute(updateProducts)
    }
  }
}
