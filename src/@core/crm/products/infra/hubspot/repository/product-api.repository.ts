import { CrmMapper } from '@/@core/crm/@shared/application/mappers/crm.mapper'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import {
  TProductAPIGatewayFindAllOutput,
  TProductAPIGatewayCreateBatchInput,
  TProductAPIGatewayCreateBatchOutput,
  TProductAPIGatewayUpdateBatchInput,
  TProductAPIGatewayUpdateBatchOutput,
} from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway.dto'
import { TProductAPIRepositoryDependencies } from '@/@core/crm/products/infra/hubspot/repository/product-api.repository.dto'

export class ProductAPIRepository implements ProductAPIRepository {
  constructor(private dependencies: TProductAPIRepositoryDependencies) {}

  findAll = async (): Promise<TProductAPIGatewayFindAllOutput> => {
    await this.dependencies.crmRepository.enforceRequestLimit()
    const response = await this.dependencies.crmRepository
      .getConnection()
      .crm.products.getAll(undefined, undefined, ['product_code'])

    return response.map((product) =>
      ProductEntity.create(
        {
          productCode: +product.properties.product_code,
        },
        product.id,
      ),
    )
  }

  createBatch = async (
    input: TProductAPIGatewayCreateBatchInput,
  ): Promise<TProductAPIGatewayCreateBatchOutput> => {
    await this.dependencies.crmRepository.enforceRequestLimit()
    await this.dependencies.crmRepository.getConnection().crm.products.batchApi.create({
      inputs: input.map((product) =>
        CrmMapper.toCreate({
          data: product.data.toCrm(),
        }),
      ),
    })
  }

  updateBatch = async (
    input: TProductAPIGatewayUpdateBatchInput,
  ): Promise<TProductAPIGatewayUpdateBatchOutput> => {
    await this.dependencies.crmRepository.enforceRequestLimit()
    await this.dependencies.crmRepository.getConnection().crm.products.batchApi.update({
      inputs: input.map((product) =>
        CrmMapper.toUpdate({
          id: product.id,
          data: product.data.toCrm(),
        }),
      ),
    })
  }
}
