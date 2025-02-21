import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { CompanyInMemoryRepository } from '@/@core/crm/companies/infra/hubspot/repository/in-memory/company-in-memory.repository'

describe('CompanyInMemoryRepository unit tests', () => {
  let sut: CompanyInMemoryRepository

  beforeEach(() => {
    sut = new CompanyInMemoryRepository()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should call createBatch method', async () => {
    const spyMethod = jest.spyOn(sut, 'createBatch')

    await sut.createBatch(CompanyFakeBuilder.theCompany(150).build())

    expect(spyMethod).toHaveBeenCalledTimes(1)
    expect((spyMethod.mock.calls[0][0] as any).length).toBe(150)
    expect(sut.items.length).toBe(150)
  })

  it('should call updateBatch method', async () => {
    const companies = CompanyFakeBuilder.theCompany(2).withActive('Sim').build()

    await sut.createBatch(companies)

    expect(sut.items[0].active).toBe('Sim')

    const spyMethod = jest.spyOn(sut, 'updateBatch')

    const companyOne = sut.items[0]
    const companyTwo = sut.items[1]
    companyOne.changeActive('Não')
    companyTwo.changeActive('Não')

    await sut.updateBatch([companyOne, companyTwo])

    expect(sut.items[0].active).toBe('Não')
    expect(sut.items[1].active).toBe('Não')
    expect(spyMethod).toHaveBeenCalledTimes(1)
    expect((spyMethod.mock.calls[0][0] as any).length).toBe(2)
    expect(sut.items.length).toBe(2)
  })
})
