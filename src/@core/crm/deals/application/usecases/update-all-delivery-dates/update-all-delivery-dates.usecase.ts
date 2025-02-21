import { UpdateCrmObjectDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { CrmFilterInputOperatorEnum } from '@/@core/crm/@shared/application/enum/filter-input.enum'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { addHours } from 'date-fns'

export class UpdateAllDeliveryDatesUseCase {
  data: UpdateCrmObjectDto<UpdateBatchData>[] = []

  constructor(
    private readonly dealRepository: DealGateway,
    private readonly fusionFacade: FusionFacade,
  ) {}

  async execute(): Promise<void> {
    const deals = await this.fetchDeals()
    const ordersToSearch: number[] = []

    deals.sort((a, b) => +a.id - +b.id)

    deals.forEach((deal) => ordersToSearch.push(deal.orderNumber))

    const chunkedOrders = SplitArrayIntoChunksUtil.splitArrayIntoChunks(ordersToSearch, 1000)
    await this.processChuckedOrders({ chunkedOrders, deals })

    const chunckedData = SplitArrayIntoChunksUtil.splitArrayIntoChunks(this.data, 100)

    for (const chunk of chunckedData) {
      await this.dealRepository.updateBatch<UpdateBatchData>(chunk)
    }
  }

  private fetchDeals = async (): Promise<DealEntity[]> => {
    return await this.dealRepository.findAll({
      filter: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'billing_date',
                operator: CrmFilterInputOperatorEnum.HasProperty,
              },
              {
                propertyName: 'delivery_datetime',
                operator: CrmFilterInputOperatorEnum.NotHasProperty,
              },
            ],
          },
        ],
      },
    })
  }

  private processChuckedOrders = async ({
    chunkedOrders,
    deals,
  }: ProcessChuckedOrdersInput): Promise<void> => {
    for (const chunkedOrder of chunkedOrders) {
      const deliveries = await this.fusionFacade.findAllDeliveryDetail({
        ordersId: chunkedOrder,
      })

      deliveries.forEach((delivery) => {
        const deal = deals.find((deal) => deal.orderNumber === delivery.orderId)

        if (deal) {
          deal.changeDeliveryDate(addHours(delivery.date, 3))

          !this.data.find((d) => d.id === deal.id) &&
            this.data.push({
              id: deal.id,
              data: {
                delivery_datetime: deal.deliveryDate.toISOString(),
              },
            })
        }
      })
    }
  }
}

type ProcessChuckedOrdersInput = {
  chunkedOrders: number[][]
  deals: DealEntity[]
}

type UpdateBatchData = { delivery_datetime: string }
