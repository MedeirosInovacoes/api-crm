import {
  CreateCrmObjectDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export type TProductAPIGatewayCreateBatchInput = CreateCrmObjectDto<ProductEntity>[]
export type TProductAPIGatewayCreateBatchOutput = void

export type TProductAPIGatewayUpdateBatchInput = UpdateCrmObjectDto<ProductEntity>[]
export type TProductAPIGatewayUpdateBatchOutput = void

export type TProductAPIGatewayFindAllOutput = ProductEntity[]
