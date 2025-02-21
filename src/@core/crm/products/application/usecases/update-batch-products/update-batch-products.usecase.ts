import { UpdateCrmObjectDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import {
  UpdateBatchProductsDependencies,
  UpdateBatchProductsInput,
  UpdateBatchProductsOutput,
} from '@/@core/crm/products/application/usecases/update-batch-products/update-batch-products.dto'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export class UpdateBatchProductsUseCase {
  constructor(private dependecies: UpdateBatchProductsDependencies) {}

  execute = async (input: UpdateBatchProductsInput): Promise<UpdateBatchProductsOutput> => {
    const items: UpdateCrmObjectDto<ProductEntity>[] = []

    for (const product of input) {
      items.push({
        id: product.id,
        data: product,
      })
    }

    await this.persistChunks({ items })
  }

  private persistChunks = async (input: PersistChuncksInput) => {
    const chunks = SplitArrayIntoChunksUtil.splitArrayIntoChunks(input.items, 100)

    for (const chunk of chunks) {
      await this.dependecies.productAPIRepository.updateBatch(chunk)
    }
  }
}

type PersistChuncksInput = {
  items: UpdateCrmObjectDto<ProductEntity>[]
}
