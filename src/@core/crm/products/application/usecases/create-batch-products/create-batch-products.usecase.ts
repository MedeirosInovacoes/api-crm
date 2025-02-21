import { CreateCrmObjectDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import {
  TCreateBatchProductsDependencies,
  TCreateBatchProductsInput,
  TCreateBatchProductsOutput,
} from '@/@core/crm/products/application/usecases/create-batch-products/create-batch-products.dto'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export class CreateBatchProductsUseCase {
  constructor(private dependecies: TCreateBatchProductsDependencies) {}

  execute = async (input: TCreateBatchProductsInput): Promise<TCreateBatchProductsOutput> => {
    const items: CreateCrmObjectDto<ProductEntity>[] = []

    for (const product of input) {
      items.push({ data: product })
    }

    await this.persistChunks({ items })
  }

  private persistChunks = async (input: PersistChuncksInput) => {
    const chunks = SplitArrayIntoChunksUtil.splitArrayIntoChunks(input.items, 100)

    for (const chunk of chunks) {
      await this.dependecies.productAPIRepository.createBatch(chunk)
    }
  }
}

type PersistChuncksInput = {
  items: CreateCrmObjectDto<ProductEntity>[]
}
