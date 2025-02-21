import {
  TFindAllProductsDependencies,
  TFindAllProductsOutput,
} from '@/@core/crm/products/application/usecases/find-all-products/find-all-products.dto'

export class FindAllProductsUseCase {
  constructor(private dependecies: TFindAllProductsDependencies) {}

  execute = async (): Promise<TFindAllProductsOutput> => {
    const response = await this.dependecies.productAPIRepository.findAll()

    return response
  }
}
