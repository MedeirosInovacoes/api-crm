import { CreateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/create-batch-products/create-batch-products.usecase'
import { ProcessProductsUseCase } from '@/@core/crm/products/application/usecases/process-products/process-products.usecase'
import { UpdateBatchProductsUseCase } from '@/@core/crm/products/application/usecases/update-batch-products/update-batch-products.usecase'
import { aProduct } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import { ProductAPIGateway } from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway'
import { ProductDBGateway } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway'
import { ProductAPIInMemoryRepository } from '@/@core/crm/products/infra/hubspot/in-memory/product-api-in-memory.repository'
import { ProductDBInMemoryRepository } from '@/@core/crm/products/infra/winthor/typeorm/in-memory/product-in-memory.repository'

describe('ProcessProductsUsecase unit tests', () => {
  let productDBRepository: ProductDBGateway
  let productAPIRepository: ProductAPIGateway
  let createBatchProductsUseCase: CreateBatchProductsUseCase
  let updateBatchProductsUseCase: UpdateBatchProductsUseCase
  let processProductsUseCase: ProcessProductsUseCase

  beforeEach(() => {
    productDBRepository = new ProductDBInMemoryRepository()

    productDBRepository.findAll = jest
      .fn()
      .mockResolvedValue([
        aProduct().withProductCode(1).build(),
        aProduct().withProductCode(2).build(),
        aProduct().withProductCode(3).build(),
        aProduct().withProductCode(4).build(),
      ])

    productAPIRepository = new ProductAPIInMemoryRepository()
    createBatchProductsUseCase = new CreateBatchProductsUseCase({
      productAPIRepository,
    })
    updateBatchProductsUseCase = new UpdateBatchProductsUseCase({
      productAPIRepository,
    })
    processProductsUseCase = new ProcessProductsUseCase({
      productDBRepository,
      productAPIRepository,
      createBatchProductsUseCase,
      updateBatchProductsUseCase,
    })
  })

  it('should be defined', () => {
    expect(processProductsUseCase).toBeDefined()
    expect(createBatchProductsUseCase).toBeDefined()
    expect(updateBatchProductsUseCase).toBeDefined()
    expect(productDBRepository).toBeDefined()
    expect(productAPIRepository).toBeDefined()
  })

  it('Deve criar 2 produtos', async () => {
    const spyCreateMethod = jest.spyOn(createBatchProductsUseCase, 'execute')

    await processProductsUseCase.execute()

    expect(spyCreateMethod).toHaveBeenCalledTimes(1)
    expect(spyCreateMethod).toHaveBeenCalledWith(
      expect.arrayContaining([expect.anything(), expect.anything()]),
    )
    expect(spyCreateMethod.mock.calls[0][0]).toHaveLength(4)
  })

  it('Deve atualizar 2 produtos', async () => {
    productAPIRepository.findAll = jest
      .fn()
      .mockResolvedValue([
        aProduct().withProductCode(1).build(),
        aProduct().withProductCode(2).build(),
      ])

    const spyUpdateMethod = jest.spyOn(updateBatchProductsUseCase, 'execute')

    await processProductsUseCase.execute()

    expect(spyUpdateMethod).toHaveBeenCalledTimes(1)
    expect(spyUpdateMethod).toHaveBeenCalledWith(
      expect.arrayContaining([expect.anything(), expect.anything()]),
    )
    expect(spyUpdateMethod.mock.calls[0][0]).toHaveLength(2)
  })
})
