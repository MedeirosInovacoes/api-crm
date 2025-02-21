import { CompanyFacadeFactory } from '@/@core/crm/companies/application/factories/facade/facade.factory'

describe('CompanyFacadeFactory unit tests', () => {
  it('should return a new instance of CompanyFacade', () => {
    const companyFacade = CompanyFacadeFactory.create({
      companyRepository: undefined,
    })

    expect(companyFacade).toBeDefined()
  })

  it('should be defined methods', () => {
    const companyFacade = CompanyFacadeFactory.create({
      companyRepository: undefined,
    })

    expect(companyFacade.createBatch).toBeDefined()
    expect(companyFacade.findAll).toBeDefined()
    expect(companyFacade.updateBatch).toBeDefined()
    expect(companyFacade.associateChildCompaniesWithParent).toBeDefined()
  })
})
