import { FindAllProductsUseCase } from '@/@core/crm/products/application/usecases/find-all-products/find-all-products.usecase'
import { aProduct } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductAPIInMemoryRepository } from '@/@core/crm/products/infra/hubspot/in-memory/product-api-in-memory.repository'

describe('FindAllProducts usecase unit tests', () => {
  let productAPIRepository: ProductAPIGateway
  let sut: FindAllProductsUseCase

  beforeEach(() => {
    productAPIRepository = new ProductAPIInMemoryRepository()

    sut = new FindAllProductsUseCase({
      productAPIRepository,
    })
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return a list of products', async () => {
    productAPIRepository.createBatch([
      {
        data: aProduct().build(),
      },
    ])
    const response = await sut.execute()

    expect(response).toHaveLength(1)
  })
})
