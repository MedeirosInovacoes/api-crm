import { FindAllCompaniesUseCase } from '@/@core/crm/companies/application/usecase/find-all-companies/find-all-companies.usecase'
import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { CompanyInMemoryRepository } from '@/@core/crm/companies/infra/hubspot/repository/in-memory/company-in-memory.repository'

describe('FindAllCompaniesUsecase unit tests', () => {
  let companyRepository: CompanyGateway

  beforeEach(() => {
    companyRepository = new CompanyInMemoryRepository()
  })
  it('should return a list of companies', async () => {
    companyRepository.createBatch(CompanyFakeBuilder.theCompany(5).build())

    const findAllCompaniesUseCase = new FindAllCompaniesUseCase({
      companyRepository,
    })

    const response = await findAllCompaniesUseCase.execute()

    expect(response).toHaveLength(5)
  })

  it('should return a list of companies with filters', async () => {
    companyRepository.createBatch(CompanyFakeBuilder.theCompany(5).build())

    const findAllCompaniesUseCase = new FindAllCompaniesUseCase({
      companyRepository,
    })

    const response = await findAllCompaniesUseCase.execute({
      filters: {
        filterGroups: [],
      },
    })

    expect(response).toHaveLength(5)
  })
})
