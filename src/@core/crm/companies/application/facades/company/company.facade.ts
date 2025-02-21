import {
  CompanyFacadeCreateBatchInput,
  CompanyFacadeUpdateBatchOutput,
  CompanyFacadeInterface,
  FindAllCompaniesFacadeDependencies,
  CompanyFacadeCreateBatchOutput,
  CompanyFacadeUpdateBatchInput,
  CompanyFacadeFindAllInput,
  CompanyFacadeFindAllOutput,
} from '@/@core/crm/companies/application/facades/company/company.facade.dto'

export class CompanyFacade implements CompanyFacadeInterface {
  constructor(private dependencies: FindAllCompaniesFacadeDependencies) {}

  associateChildCompaniesWithParent(): Promise<void> {
    return this.dependencies.associateChildCompaniesWithParentUseCase.execute()
  }

  async createBatch(input: CompanyFacadeCreateBatchInput): Promise<CompanyFacadeCreateBatchOutput> {
    return this.dependencies.createBatchCompaniesUseCase.execute(input)
  }

  updateBatch = async (
    input: CompanyFacadeUpdateBatchInput,
  ): Promise<CompanyFacadeUpdateBatchOutput> => {
    return this.dependencies.updateBatchCompaniesUseCase.execute(input)
  }

  async findAll(input?: CompanyFacadeFindAllInput): Promise<CompanyFacadeFindAllOutput> {
    return this.dependencies.findAllCompaniesUseCase.execute(input)
  }
}
