import { CreateCrmObjectDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import {
  TProductAPIGatewayCreateBatchInput,
  TProductAPIGatewayCreateBatchOutput,
  TProductAPIGatewayUpdateBatchInput,
  TProductAPIGatewayUpdateBatchOutput,
  TProductAPIGatewayFindAllOutput,
} from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway.dto'

export class ProductAPIInMemoryRepository implements ProductAPIGateway {
  items: CreateCrmObjectDto<ProductEntity>[] = []

  createBatch = async (
    input: TProductAPIGatewayCreateBatchInput,
  ): Promise<TProductAPIGatewayCreateBatchOutput> => {
    this.items.push(...input)
    return Promise.resolve()
  }

  updateBatch = async (
    input: TProductAPIGatewayUpdateBatchInput,
  ): Promise<TProductAPIGatewayUpdateBatchOutput> => {
    for (const productItem of input) {
      const index = this.items.findIndex((item) => item.data.id === productItem.data.id)

      if (index !== -1) {
        this.items[index] = productItem
      }
    }

    return Promise.resolve()
  }

  findAll = async (): Promise<TProductAPIGatewayFindAllOutput> => {
    return Promise.resolve(this.items.map((item) => item.data))
  }
}
