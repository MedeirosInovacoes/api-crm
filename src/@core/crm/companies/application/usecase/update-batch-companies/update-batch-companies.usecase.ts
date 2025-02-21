import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import {
  UpdateBatchCompaniesDependecies,
  UpdateBatchCompaniesInput,
  UpdateBatchCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/update-batch-companies/update-batch-companies.dto'

export class UpdateBatchCompaniesUseCase {
  constructor(private dependecies: UpdateBatchCompaniesDependecies) {}

  async execute(input: UpdateBatchCompaniesInput): Promise<UpdateBatchCompaniesOutput> {
    await this.persistChunks({ items: input })
  }

  private persistChunks = async ({ items }: PersistChuncksInput): Promise<void> => {
    const chunks = SplitArrayIntoChunksUtil.splitArrayIntoChunks(items, 100)

    for (const chunk of chunks) {
      await this.dependecies.companyRepository.updateBatch(chunk)
    }
  }
}

type PersistChuncksInput = {
  items: UpdateBatchCompaniesInput
}
