import { CreateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/create-batch-products/create-batch-products.usecase'
import { theProducts } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductAPIInMemoryRepository } from '@/@core/crm/products/infra/hubspot/in-memory/product-api-in-memory.repository'

describe('CreateBatchProductsUsecase unit tests', () => {
  let productAPIRepository: ProductAPIGateway
  let createBatchProductsUsecase: CreateBatchProductsUseCase

  beforeAll(() => {
    productAPIRepository = new ProductAPIInMemoryRepository()

    createBatchProductsUsecase = new CreateBatchProductsUseCase({
      productAPIRepository,
    })
  })
  it('Deve criar nenhuma empresa', async () => {
    await createBatchProductsUsecase.execute([])

    const createBatchSpy = jest.spyOn(productAPIRepository, 'createBatch')

    expect(createBatchSpy).toHaveBeenCalledTimes(0)
  })

  it('Deve criar produtos em lotes', async () => {
    const input = theProducts(220).build()

    await createBatchProductsUsecase.execute(input)

    const createBatchSpy = jest.spyOn(productAPIRepository, 'createBatch')

    expect(createBatchSpy).toHaveBeenCalledTimes(3)
  })
})
