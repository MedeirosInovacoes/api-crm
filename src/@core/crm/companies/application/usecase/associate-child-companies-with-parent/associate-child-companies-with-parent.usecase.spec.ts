import { AssociateChildCompaniesWithParentUseCase } from '@/@core/crm/companies/application/usecase/associate-child-companies-with-parent/associate-child-companies-with-parent.usecase'
import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { CompanyInMemoryRepository } from '@/@core/crm/companies/infra/hubspot/repository/in-memory/company-in-memory.repository'

describe('AssociateChildCompaniesWithParentUsecase unit tests', () => {
  let mockCompanyRepository: CompanyGateway
  let sut: AssociateChildCompaniesWithParentUseCase

  beforeEach(() => {
    mockCompanyRepository = new CompanyInMemoryRepository()
    mockCompanyRepository.createBatch([
      CompanyFakeBuilder.aCompany().withCustomerCode(1).withCustomerPrimaryCode(1).build(),
      CompanyFakeBuilder.aCompany().withCustomerCode(2).withCustomerPrimaryCode(1).build(),
      CompanyFakeBuilder.aCompany().withCustomerCode(3).withCustomerPrimaryCode(3).build(),
      CompanyFakeBuilder.aCompany().withCustomerCode(4).withCustomerPrimaryCode(3).build(),
      CompanyFakeBuilder.aCompany().withCustomerCode(5).withCustomerPrimaryCode(5).build(),
    ])
    sut = new AssociateChildCompaniesWithParentUseCase({
      companyRepository: mockCompanyRepository,
    })
  })

  it('should be defined', () => {
    expect(mockCompanyRepository).toBeDefined()
    expect(sut).toBeDefined()
  })

  it('should call persistChunks method', async () => {
    const spyMethod = jest.spyOn(sut as any, 'persistChunks')

    await sut.execute()

    expect(spyMethod).toHaveBeenCalledTimes(1)
    expect((spyMethod.mock.calls[0][0] as any).items.length).toBe(2)
  })

  it('should call the associateBatch method', async () => {
    const spyAssociateBatch = jest.spyOn(mockCompanyRepository, 'associateBatch')

    await sut.execute()

    expect(spyAssociateBatch).toHaveBeenCalledTimes(1)
  })

  it('should call the findAll method', async () => {
    const spyFindAll = jest.spyOn(mockCompanyRepository, 'findAll')

    await sut.execute()

    expect(spyFindAll).toHaveBeenCalledTimes(1)
  })
})
