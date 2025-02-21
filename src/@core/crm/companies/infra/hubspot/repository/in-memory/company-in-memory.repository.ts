import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
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

export class CompanyInMemoryRepository implements CompanyGateway {
  items: CompanyEntity[] = []

  createBatch = async (
    input: CompanyGatewayCreateBatchInput,
  ): Promise<CompanyGatewayCreateBatchOutput> => {
    this.items.push(...input)

    return Promise.resolve(input)
  }

  updateBatch = async (
    input: CompanyGatewayUpdateBatchInput,
  ): Promise<CompanyGatewayUpdateBatchOutput> => {
    for (const companyItem of input) {
      const index = this.items.findIndex((item) => item.id === companyItem.id)

      if (index !== -1) {
        this.items[index] = new CompanyEntity(
          {
            ...this.items[index]['_props'],
            ...companyItem,
          },
          companyItem.id,
        )
      }
    }
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  findAll = async (input?: CompanyGatewayFindAllInput): Promise<CompanyGatewayFindAllOutput> => {
    const result: CompanyEntity[] = []

    result.push(...this.items)

    return Promise.resolve(result)
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  associateBatch = async (
    input: CompanyGatewayAssociateInput,
  ): Promise<CompanyGatewayAssociateOutput> => {
    return Promise.resolve()
  }
}
