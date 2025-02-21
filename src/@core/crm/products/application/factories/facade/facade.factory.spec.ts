import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'
import { ProductFacadeFactory } from '@/@core/crm/products/application/factories/facade/facade.factory'

describe('ProductFacadeFactory unit tests', () => {
  const sut = ProductFacadeFactory

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return a new instance of ProductFacade', () => {
    const facade = sut.create({
      crmRepository: undefined,
    })

    expect(facade).toBeDefined()
    expect(facade).toBeInstanceOf(ProductFacade)
    expect(facade.findAll).toBeDefined()
  })
})
