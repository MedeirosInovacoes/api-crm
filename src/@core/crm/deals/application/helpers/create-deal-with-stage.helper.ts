import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

export class CreateDealWithStageHelper {
  static execute = (
    input: CreateDealWithStageHelperInputDto,
  ): CreateDealWithStageHelperOutputDto => {
    const entity = DealEntity.createOrderFromCustomer({
      id: input.id,
      customerCode: input.order?.customerCode,
      limit: input.limit,
      name: input.name,
      order: input.order,
      companyId: input.companyId,
      pipelineId: input.pipelineId,
      stage: input.newStage,
    })

    entity.changeStage(input.newStage)

    return entity
  }
}

export type CreateDealWithStageHelperInputDto = {
  id: string
  order: OrderEntity
  name: string
  limit: number
  newStage: string
  companyId: string
  pipelineId: string
}

export type CreateDealWithStageHelperOutputDto = DealEntity
