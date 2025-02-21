import {
  CreateBatchCompaniesDependecies,
  CreateBatchCompaniesInput,
  CreateBatchCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.dto'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'

export default class CreateBatchCompaniesUseCase {
  constructor(private dependecies: CreateBatchCompaniesDependecies) {}

  async execute(input: CreateBatchCompaniesInput): Promise<CreateBatchCompaniesOutput> {
    const response = await this.persistChunks({ items: input })

    return response
  }

  private persistChunks = async ({ items }: PersistChuncksInput): Promise<PersistChuncksOutput> => {
    const result: CompanyEntity[] = []

    const chunks = SplitArrayIntoChunksUtil.splitArrayIntoChunks(items, 100)

    for (const chunk of chunks) {
      const response = await this.dependecies.companyRepository.createBatch(chunk)

      result.push(...response)
    }

    return result
  }
}

type PersistChuncksInput = {
  items: CreateBatchCompaniesInput
}

type PersistChuncksOutput = CompanyEntity[]
