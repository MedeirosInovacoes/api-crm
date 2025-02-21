import {
  TFindAllDealsPipelinesDependencies,
  TFindAllDealsPipelinesOutput,
} from './find-all-deals-pipelines.dto'
import { DEALS_FIELDS } from '@/@core/crm/deals/infra/constants/deals-fields'
import { FindAllDealsPipelinesOutputMapper } from '@/@core/crm/deals/application/mappers/find-all-deals-pipelines/find-all-deals-pipelines.mapper'

export class FindAllDealsPipelinesUseCase {
  constructor(private readonly dependencies: TFindAllDealsPipelinesDependencies) {}

  async execute(): Promise<TFindAllDealsPipelinesOutput[]> {
    const { deals } = await this.fecthData()

    const ownersNames: Record<string, any>[] = []

    const ownersIds = new Set(deals.map((item) => item.ownerId).filter((item) => !!item))

    for (const ownerId of [...ownersIds]) {
      const response = await this.dependencies.dealRepository.findOwnerById({ id: ownerId })

      if (response?.name) {
        ownersNames.push({ id: ownerId, name: response.name })
      }
    }

    return deals.map((deal) => FindAllDealsPipelinesOutputMapper.map(deal, ownersNames))
  }

  private fecthData = async () => {
    const output = await this.dependencies.dealRepository.findAll({
      properties: [
        ...Object.values(DEALS_FIELDS),
        'dealstage',
        'pipeline',
        'dealname',
        'customer_code',
        'hubspot_owner_id',
        'associations.company',
        'negocio_perdido',
        'closed_lost_reason',
      ],
    })

    return { deals: output }
  }
}
