import { UpdateBatchCompaniesUseCase } from '@/@core/crm/companies/application/usecase/update-batch-companies/update-batch-companies.usecase'
import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { CompanyInMemoryRepository } from '@/@core/crm/companies/infra/hubspot/repository/in-memory/company-in-memory.repository'

describe('UpdateBatchCompaniesUsecase unit tests', () => {
  let mockCompanyRepository: CompanyGateway
  let sut: UpdateBatchCompaniesUseCase

  beforeEach(() => {
    mockCompanyRepository = new CompanyInMemoryRepository()
    sut = new UpdateBatchCompaniesUseCase({
      companyRepository: mockCompanyRepository,
    })
  })

  it('should be defined', () => {
    expect(mockCompanyRepository).toBeDefined()
    expect(sut).toBeDefined()
  })

  it('should call persistChunks method', async () => {
    const spyMethod = jest.spyOn(sut as any, 'persistChunks')

    await sut.execute(CompanyFakeBuilder.theCompany(2).build())

    expect(spyMethod).toHaveBeenCalledTimes(1)
    expect((spyMethod.mock.calls[0][0] as any).items.length).toBe(2)
  })

  it('should update batch companies', async () => {
    const companies = CompanyFakeBuilder.theCompany(2).build()

    mockCompanyRepository.createBatch(companies)

    const spyUpdateBatch = jest.spyOn(mockCompanyRepository, 'updateBatch')

    await sut.execute(companies)

    expect(spyUpdateBatch).toHaveBeenCalledTimes(1)
    expect(spyUpdateBatch).toHaveBeenCalledWith(companies)
  })
})
