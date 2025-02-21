import CreateBatchCompaniesUseCase from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.usecase'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { CreateBatchCompaniesInput } from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.dto'
import { CompanyInMemoryRepository } from '@/@core/crm/companies/infra/hubspot/repository/in-memory/company-in-memory.repository'

describe('CreateBatchCompaniesUsecase unit tests', () => {
  let sut: CreateBatchCompaniesUseCase
  let mockCompanyRepository: CompanyGateway

  beforeEach(() => {
    mockCompanyRepository = new CompanyInMemoryRepository()
    sut = new CreateBatchCompaniesUseCase({
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

  it('should not create any company', async () => {
    const response = await sut.execute([])

    expect(response).toEqual([])
  })

  it('should create companies in batches', async () => {
    const companies: CreateBatchCompaniesInput = CompanyFakeBuilder.theCompany(230).build()

    const result = await sut.execute(companies)

    expect(result).toHaveLength(230)
    expect(result).toEqual(companies)
  })
})
