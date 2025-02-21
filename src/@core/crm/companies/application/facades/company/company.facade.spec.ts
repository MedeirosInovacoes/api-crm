import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CompanyFacadeFactory } from '@/@core/crm/companies/application/factories/facade/facade.factory'

describe('CompanyFacade unit tests', () => {
  let companyFacade: CompanyFacade

  beforeEach(() => {
    companyFacade = CompanyFacadeFactory.create({
      companyRepository: undefined,
    })
  })

  it('should be defined', () => {
    expect(companyFacade).toBeDefined()
  })

  it('should be defined methods', () => {
    expect(companyFacade.createBatch).toBeDefined()
    expect(companyFacade.findAll).toBeDefined()
    expect(companyFacade.updateBatch).toBeDefined()
    expect(companyFacade.associateChildCompaniesWithParent).toBeDefined()
  })
})
