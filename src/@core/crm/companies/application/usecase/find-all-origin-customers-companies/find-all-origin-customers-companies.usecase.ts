import {
  TFindAllOriginCustomersCompaniesDependencies,
  TFindAllOriginCustomersCompaniesInput,
  TFindAllOriginCustomersCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/find-all-origin-customers-companies/find-all-origin-customers-companies.dto'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'

export class FindAllOriginCustomersCompaniesUseCase {
  constructor(private readonly dependencies: TFindAllOriginCustomersCompaniesDependencies) {}

  async execute(
    input: TFindAllOriginCustomersCompaniesInput,
  ): Promise<TFindAllOriginCustomersCompaniesOutput[]> {
    const { companies } = await this.fetchData(input)

    return companies.map((company) => ({
      id: company.id,
      customerCode: company.customerCode,
      originalSource: company.originalSource,
      originalInDepthSource1: company.originalInDepthSource1,
      originalInDepthSource2: company.originalInDepthSource2,
    }))
  }

  private mapToHubSpotColumns(fields: string[]): object {
    const hubSpotColumns = {
      fonteOriginal: 'hs_analytics_source',
      fonteOriginalAprofundada1: 'hs_analytics_source_data_1',
      fonteOriginalAprofundada2: 'hs_analytics_source_data_2',
    }

    return Object.keys(hubSpotColumns).reduce((acc, name) => {
      if (fields.find((field) => field.toLocaleLowerCase() === name.toLowerCase())) {
        acc[name] = hubSpotColumns[name]
      }

      return acc
    }, {})
  }

  private fetchData = async (input: TFetchDataInput): Promise<TFetchDataOutput> => {
    const selectedProperties = [
      ...Object.values(this.mapToHubSpotColumns(input.fields)),
      'origin_lead',
      'customer_code',
    ]

    const response = await this.dependencies.companyRepository.findAll({
      filters: {
        filterGroups: [],
        properties: selectedProperties,
      },
    })

    return { companies: response }
  }
}

type TFetchDataInput = {
  fields: string[]
}

type TFetchDataOutput = {
  companies: CompanyEntity[]
}
