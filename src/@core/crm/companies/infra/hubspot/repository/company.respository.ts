import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { CrmMapper } from '@/@core/crm/@shared/application/mappers/crm.mapper'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import {
  FilterGroup,
  FilterOperatorEnum,
  PublicObjectSearchRequest,
} from '@hubspot/api-client/lib/codegen/crm/companies'
import { CompanyToDomainMapper } from '@/@core/crm/companies/infra/hubspot/mappers/company/company-to-domain.repository.mapper'
import {
  CompanyGatewayAssociateInput,
  CompanyGatewayAssociateOutput,
  CompanyGatewayCreateBatchInput,
  CompanyGatewayCreateBatchOutput,
  CompanyGatewayFindAllInput,
  CompanyGatewayFindAllOutput,
  CompanyGatewayUpdateBatchInput,
  CompanyGatewayUpdateBatchOutput,
} from '@/@core/crm/companies/domain/gateway/company/company.gateway.dto'

export class CompanyHubSpotRepository implements CompanyGateway {
  constructor(private crmRepository: CrmGatewayInterface) {}

  createBatch = async (
    input: CompanyGatewayCreateBatchInput,
  ): Promise<CompanyGatewayCreateBatchOutput> => {
    const result: CompanyEntity[] = []

    try {
      await this.crmRepository.enforceRequestLimit()
      const response = await this.crmRepository.getConnection().crm.companies.batchApi.create({
        inputs: input.map((company) =>
          CrmMapper.toCreate({
            data: company.toCreateCrm(),
          }),
        ),
      })

      result.push(...response.results.map(CompanyToDomainMapper.map))
    } catch (error) {
      console.log(error)
    }

    return result
  }

  updateBatch = async (
    input: CompanyGatewayUpdateBatchInput,
  ): Promise<CompanyGatewayUpdateBatchOutput> => {
    try {
      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository.getConnection().crm.companies.batchApi.update({
        inputs: input.map((company) =>
          CrmMapper.toUpdate({
            id: company.id,
            data: company.toCreateCrm(),
          }),
        ),
      })
    } catch (error) {
      console.log(error)
    }
  }

  findAll = async (input?: CompanyGatewayFindAllInput): Promise<CompanyGatewayFindAllOutput> => {
    const result: CompanyEntity[] = []

    try {
      const properties = [
        'client',
        'customer_primary_code',
        'customer_code',
        'cpf',
        'cnpj',
        'origin_lead',
      ]

      if (input?.filters) {
        let after: string | undefined = undefined

        while (true) {
          const searchRequest: PublicObjectSearchRequest = {
            filterGroups: input.filters.filterGroups.map((filterGroup) => ({
              filters: filterGroup.filters.map((filter) => ({
                propertyName: filter.propertyName,
                operator: filter.operator as unknown as FilterOperatorEnum,
                value: filter.value,
              })),
            })) as unknown as FilterGroup[],
            properties: input.filters.properties ?? properties,
            limit: 100,
            sorts: input.filters.sorts ?? [],
            after,
          }

          await this.crmRepository.enforceRequestLimit()
          const response = await this.crmRepository
            .getConnection()
            .crm.companies.searchApi.doSearch(searchRequest)

          if (!response.results || response.results.length === 0) {
            break
          }

          const companies = response.results.map(CompanyToDomainMapper.map)
          result.push(...companies)

          after = response.paging?.next?.after
          if (!after) {
            break
          }
        }
      } else {
        await this.crmRepository.enforceRequestLimit()
        const response = await this.crmRepository
          .getConnection()
          .crm.companies.getAll(undefined, undefined, properties, undefined, ['0-1', '0-3'])

        result.push(...response.map(CompanyToDomainMapper.map))
      }
    } catch (error) {
      console.log(error)
    }

    return result
  }

  associateBatch = async (
    input: CompanyGatewayAssociateInput,
  ): Promise<CompanyGatewayAssociateOutput> => {
    try {
      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository
        .getConnection()
        .crm.associations.v4.batchApi.create('companies', 'companies', {
          inputs: input.map(CrmMapper.toAssociationWithFrom),
        })
    } catch (error) {
      console.log(error)
    }
  }
}
