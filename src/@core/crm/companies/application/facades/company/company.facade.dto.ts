import { AssociateChildCompaniesWithParentOutput } from '@/@core/crm/companies/application/usecase/associate-child-companies-with-parent/associate-child-companies-with-parent.dto'
import { AssociateChildCompaniesWithParentUseCase } from '@/@core/crm/companies/application/usecase/associate-child-companies-with-parent/associate-child-companies-with-parent.usecase'
import {
  CreateBatchCompaniesInput,
  CreateBatchCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.dto'
import CreateBatchCompaniesUseCase from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.usecase'
import {
  FindAllCompaniesInput,
  FindAllCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/find-all-companies/find-all-companies.dto'
import { FindAllCompaniesUseCase } from '@/@core/crm/companies/application/usecase/find-all-companies/find-all-companies.usecase'
import {
  UpdateBatchCompaniesInput,
  UpdateBatchCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/update-batch-companies/update-batch-companies.dto'
import { UpdateBatchCompaniesUseCase } from '@/@core/crm/companies/application/usecase/update-batch-companies/update-batch-companies.usecase'

export type CompanyFacadeCreateBatchInput = CreateBatchCompaniesInput
export type CompanyFacadeCreateBatchOutput = CreateBatchCompaniesOutput

export type CompanyFacadeUpdateBatchInput = UpdateBatchCompaniesInput
export type CompanyFacadeUpdateBatchOutput = UpdateBatchCompaniesOutput

export type CompanyFacadeFindAllInput = FindAllCompaniesInput
export type CompanyFacadeFindAllOutput = FindAllCompaniesOutput

export type CompanyFacadeAssociateOutput = AssociateChildCompaniesWithParentOutput

export type FindAllCompaniesFacadeDependencies = {
  createBatchCompaniesUseCase: CreateBatchCompaniesUseCase
  updateBatchCompaniesUseCase: UpdateBatchCompaniesUseCase
  findAllCompaniesUseCase: FindAllCompaniesUseCase
  associateChildCompaniesWithParentUseCase: AssociateChildCompaniesWithParentUseCase
}

export interface CompanyFacadeInterface {
  createBatch(input: CompanyFacadeCreateBatchInput): Promise<CompanyFacadeCreateBatchOutput>
  updateBatch(input: CompanyFacadeUpdateBatchInput): Promise<CompanyFacadeUpdateBatchOutput>
  findAll(input?: CompanyFacadeFindAllInput): Promise<CompanyFacadeFindAllOutput>
  associateChildCompaniesWithParent(): Promise<CompanyFacadeAssociateOutput>
}
