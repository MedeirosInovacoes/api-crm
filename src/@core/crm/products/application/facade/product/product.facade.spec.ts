import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'
import { FindAllProductsUseCase } from '@/@core/crm/products/application/usecases/find-all-products/find-all-products.usecase'
import { aProduct } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductAPIInMemoryRepository } from '@/@core/crm/products/infra/hubspot/in-memory/product-api-in-memory.repository'

describe('ProductFacade unit tests', () => {
  let sut: ProductFacade
  let productAPIRepository: ProductAPIGateway
  let findAllProductsUseCase: FindAllProductsUseCase

  beforeEach(() => {
    productAPIRepository = new ProductAPIInMemoryRepository()
    findAllProductsUseCase = new FindAllProductsUseCase({
      productAPIRepository,
    })
    sut = new ProductFacade({ findAllProductsUseCase })
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
    expect(productAPIRepository).toBeDefined()
    expect(findAllProductsUseCase).toBeDefined()
  })

  it('should return a list of products', async () => {
    productAPIRepository.createBatch([
      {
        data: aProduct().build(),
      },
      {
        data: aProduct().build(),
      },
      {
        data: aProduct().build(),
      },
    ])
    const response = await sut.findAll()

    expect(response).toHaveLength(3)
  })
})
