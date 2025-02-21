import { UpdateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/update-batch-products/update-batch-products.usecase'
import { theProducts } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductAPIInMemoryRepository } from '@/@core/crm/products/infra/hubspot/in-memory/product-api-in-memory.repository'

describe('UpdateBatchProductsUsecase unit tests', () => {
  let productAPIRepository: ProductAPIGateway
  let updateBatchProductsUsecase: UpdateBatchProductsUseCase

  beforeAll(() => {
    productAPIRepository = new ProductAPIInMemoryRepository()

    updateBatchProductsUsecase = new UpdateBatchProductsUseCase({
      productAPIRepository,
    })
  })
  it('Deve atualizar nenhuma empresa', async () => {
    await updateBatchProductsUsecase.execute([])

    const updateBatchSpy = jest.spyOn(productAPIRepository, 'updateBatch')

    expect(updateBatchSpy).toHaveBeenCalledTimes(0)
  })

  it('Deve atualizar produtos em lotes', async () => {
    await updateBatchProductsUsecase.execute(theProducts(10).build())

    const updateBatchSpy = jest.spyOn(productAPIRepository, 'updateBatch')

    expect(updateBatchSpy).toHaveBeenCalledTimes(1)
  })
})
