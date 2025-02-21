import {
  TProductAPIGatewayCreateBatchInput,
  TProductAPIGatewayCreateBatchOutput,
  TProductAPIGatewayFindAllOutput,
  TProductAPIGatewayUpdateBatchInput,
  TProductAPIGatewayUpdateBatchOutput,
} from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway.dto'

export type ProductAPIGateway = {
  createBatch(
    input: TProductAPIGatewayCreateBatchInput,
  ): Promise<TProductAPIGatewayCreateBatchOutput>
  updateBatch(
    input: TProductAPIGatewayUpdateBatchInput,
  ): Promise<TProductAPIGatewayUpdateBatchOutput>
  findAll(): Promise<TProductAPIGatewayFindAllOutput>
}
