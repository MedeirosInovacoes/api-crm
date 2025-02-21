import { env } from '@/@core/@shared/infra/env'
import {
  AssociationCrmObjectWithFromDto,
  CreateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'
import {
  CreateBatchDealsRecurrentsInputDto,
  CreateBatchDealsRecurrentsOutputDto,
} from '@/@core/crm/deals/application/usecases/pipelines/recurrents/create-batch-deals-recurrents/create-batch-recurrents.dto'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { DealCrmBuilderOutputDto } from '@/@core/crm/deals/domain/entities/deal-crm.build'

export class CreateBatchDealsRecurrentsUseCase {
  constructor(private readonly dealsRepository: DealGateway) {}

  async execute(
    input: CreateBatchDealsRecurrentsInputDto,
  ): Promise<CreateBatchDealsRecurrentsOutputDto> {
    let data: CreateCrmObjectDto<DealCrmBuilderOutputDto>[] = []

    for (const [index, { customer, deal, products, companies }] of input.entries()) {
      if (customer.orders.length) {
        const company = companies.find(
          ({ customerCode }) => +customerCode === customer.customerCode,
        )

        if (company) {
          for (const order of customer.orders) {
            const associations: AssociationCrmObjectWithFromDto[] = []

            order.items.forEach((orderItem) => {
              const product = products.find(
                (product) => +product.productCode === orderItem.productCode,
              )

              if (product) {
                associations.push({
                  from: { id: product.id },
                  to: { id: deal.id },
                  types: [
                    {
                      category: AssociationTypeEnum.CRM_DEFINED,
                      typeId: 630,
                    },
                  ],
                })
              }
            })

            associations.push({
              from: { id: deal.id },
              to: { id: company.id },
              types: [
                {
                  category: AssociationTypeEnum.CRM_DEFINED,
                  typeId: 630,
                },
              ],
            })

            deal.changeStage(env.RECURRENTS_PIPELINE_DONE_DEAL_ID)
            deal.changeStage(env.RECURRENTS_PIPELINE_ID)

            data.push({
              associations,
              data: deal.toCrm(),
            })

            if (data.length === 100 || data.length === index + 1) {
              await this.dealsRepository.createBatch(data)
              data = []
            }
          }
        }
      }
    }
  }
}
