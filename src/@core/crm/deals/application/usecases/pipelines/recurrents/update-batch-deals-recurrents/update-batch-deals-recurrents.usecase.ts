import {
  AssociationCrmObjectWithFromDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { CreateDealWithStageHelper } from '@/@core/crm/deals/application/helpers/create-deal-with-stage.helper'
import { CreateProductAssociationHelper } from '@/@core/crm/deals/application/helpers/create-product-associations.helper'
import {
  UpdateBatchDealsRecurrentsInputDto,
  UpdateBatchDealsRecurrentsOutputDto,
} from '@/@core/crm/deals/application/usecases/pipelines/recurrents/update-batch-deals-recurrents/update-batch-deals-recurrents.dto'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { DealCrmBuilderOutputDto } from '@/@core/crm/deals/domain/entities/deal-crm.build'
import { env } from 'process'

export class UpdateBatchDealsRecurrentsUseCase {
  constructor(private readonly dealRepository: DealGateway) {}

  execute = async (
    input: UpdateBatchDealsRecurrentsInputDto,
  ): Promise<UpdateBatchDealsRecurrentsOutputDto> => {
    let data: UpdateCrmObjectDto<DealCrmBuilderOutputDto>[] = []
    let associations: AssociationCrmObjectWithFromDto[] = []

    for (const [index, object] of input.entries()) {
      const productsIds = object.order.items.map(
        (item) => object.products.find((product) => product.productCode === item.productCode)?.id,
      )

      associations = CreateProductAssociationHelper.execute({
        dealId: object.deal.id,
        productsIds,
      })

      const entity = CreateDealWithStageHelper.execute({
        id: object.deal.id,
        order: object.order,
        limit: object.limit,
        name: object.name,
        companyId: object.deal.companyId,
        pipelineId: object.deal.pipelineId,
        newStage: env.NEW_CUSTOMERS_PIPELINE_DONE_DEAL_ID,
      })

      data.push({ id: entity.id, data: entity.toCrm(), associations })

      associations = []

      if (data.length === 100 || input.length === index + 1) {
        await this.dealRepository.updateBatch(data)
        data = []
        associations = []
      }
    }
  }
}
