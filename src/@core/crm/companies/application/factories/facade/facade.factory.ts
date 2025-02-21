import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { AssociateChildCompaniesWithParentUseCase } from '@/@core/crm/companies/application/usecase/associate-child-companies-with-parent/associate-child-companies-with-parent.usecase'
import CreateBatchCompaniesUseCase from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.usecase'
import { FindAllCompaniesUseCase } from '@/@core/crm/companies/application/usecase/find-all-companies/find-all-companies.usecase'
import { UpdateBatchCompaniesUseCase } from '@/@core/crm/companies/application/usecase/update-batch-companies/update-batch-companies.usecase'
import {
  CompanyFacadeFactoryCreateInput,
  CompanyFacadeFactoryCreateOutput,
} from '@/@core/crm/companies/application/factories/facade/facade.factory.dto'

export class CompanyFacadeFactory {
  static create = ({
    companyRepository,
  }: CompanyFacadeFactoryCreateInput): CompanyFacadeFactoryCreateOutput => {
    const createBatchCompaniesUseCase = new CreateBatchCompaniesUseCase({ companyRepository })
    const updateBatchCompaniesUseCase = new UpdateBatchCompaniesUseCase({ companyRepository })
    const findAllCompaniesUseCase = new FindAllCompaniesUseCase({ companyRepository })
    const associateChildCompaniesWithParentUseCase = new AssociateChildCompaniesWithParentUseCase({
      companyRepository,
    })

    return new CompanyFacade({
      createBatchCompaniesUseCase,
      updateBatchCompaniesUseCase,
      findAllCompaniesUseCase,
      associateChildCompaniesWithParentUseCase,
    })
  }
}
