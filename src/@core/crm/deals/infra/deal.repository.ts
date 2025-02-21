import { Either, left } from '@/@core/@shared/domain/errors/either'
import {
  AssociationCrmObjectWithFromDto,
  CreateCrmObjectDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { CrmMapper } from '@/@core/crm/@shared/application/mappers/crm.mapper'
import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import {
  DealGateway,
  TFindAllDealRepositoryInput,
  TFindOwnerByIdRepositoryInput,
  TFindOwnerByIdRepositoryOutPut,
} from '@/@core/crm/deals/domain/deal.gateway'
import { DealCrmBuilderOutputDto } from '@/@core/crm/deals/domain/entities/deal-crm.build'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { DealInfraMapper } from '@/@core/crm/deals/infra/mappers/deal.mapper'
import { PublicAssociationMultiPost } from '@hubspot/api-client/lib/codegen/crm/associations/v4'
import {
  FilterGroup,
  FilterOperatorEnum,
  PublicObjectSearchRequest,
} from '@hubspot/api-client/lib/codegen/crm/companies'

export class DealRepository implements DealGateway {
  constructor(private readonly crmRepository: CrmGatewayInterface) {}

  findAll = async (input: TFindAllDealRepositoryInput): Promise<DealEntity[]> => {
    const result: DealEntity[] = []
    const properties = [
      'dealname',
      'customer_code',
      'dealstage',
      'pipeline',
      'note_number',
      'closedate',
      'order_number',
    ]

    if (input?.filter) {
      let after = undefined

      while (true) {
        const searchRequest: PublicObjectSearchRequest = {
          filterGroups: input.filter.filterGroups.map((filterGroup) => ({
            filters: filterGroup.filters.map((filter) => ({
              propertyName: filter.propertyName,
              operator: filter.operator as unknown as FilterOperatorEnum,
              value: filter.value,
            })),
          })) as unknown as FilterGroup[],
          properties: input.filter?.properties ?? properties,
          limit: 100,
          sorts: input.filter.sorts ?? [],
          after,
        }

        await this.crmRepository.enforceRequestLimit()
        const response = await this.crmRepository
          .getConnection()
          .crm.deals.searchApi.doSearch(searchRequest)

        if (!response.results) {
          break
        }

        result.push(...response.results.map(DealInfraMapper.toDomain))

        if (!response.paging?.next?.after) {
          break
        }

        after = response.paging.next.after
      }

      return result
    }

    await this.crmRepository.enforceRequestLimit()
    const response = await this.crmRepository
      .getConnection()
      .crm.deals.getAll(undefined, undefined, input?.properties ?? properties, undefined, ['0-2'])

    return response.map(DealInfraMapper.toDomain)
  }

  createBatch = async (
    input: CreateCrmObjectDto<DealCrmBuilderOutputDto>[],
  ): Promise<Either<Error, void>> => {
    try {
      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository.getConnection().crm.deals.batchApi.create({
        inputs: input.map((deal) =>
          CrmMapper.toCreate({
            data: deal.data,
            associations: deal.associations,
          }),
        ),
      })
    } catch (err) {
      console.log(err)
      return left(new Error(err))
    }
  }

  updateBatch = async <T = DealCrmBuilderOutputDto>(
    input: UpdateCrmObjectDto<T>[],
  ): Promise<Either<Error, void>> => {
    try {
      const associations: AssociationCrmObjectWithFromDto[] = []
      input.forEach((deal) =>
        deal.associations?.forEach((association) =>
          associations.push(association as AssociationCrmObjectWithFromDto),
        ),
      )

      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository.getConnection().crm.deals.batchApi.update({
        inputs: input.map((deal) =>
          CrmMapper.toUpdate({
            id: deal.id,
            data: deal.data,
          }),
        ),
      })

      await this.crmRepository.enforceRequestLimit()
      await this.createAssociations({
        associations: associations.map((association) =>
          CrmMapper.toAssociationWithFrom({
            from: { id: association.from.id },
            to: { id: association.to.id },
            types: association.types,
          }),
        ),
      })
    } catch (err) {
      console.log(err)
      return left(new Error(err))
    }
  }

  private createAssociations = async ({
    associations,
  }: {
    associations: PublicAssociationMultiPost[]
  }) => {
    let data = []

    for (const [index, association] of associations.entries()) {
      data.push(association)

      if (data.length === 100 || associations.length === index + 1) {
        await this.crmRepository.enforceRequestLimit()
        this.crmRepository.getConnection().crm.associations.v4.batchApi.create('deal', 'product', {
          inputs: data,
        })

        data = []
      }
    }
  }

  findOwnerById = async (
    input: TFindOwnerByIdRepositoryInput,
  ): Promise<TFindOwnerByIdRepositoryOutPut> => {
    await this.crmRepository.enforceRequestLimit()
    const response = await this.crmRepository
      .getConnection()
      .crm.owners.ownersApi.getById(+input.id)

    const fullOwnerName = response.firstName + ' ' + response.lastName

    return { name: fullOwnerName }
  }
}
