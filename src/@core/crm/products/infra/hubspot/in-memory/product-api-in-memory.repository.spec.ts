import { aProduct } from '@/@core/crm/products/domain/builders/product/product-fake.builder'
import {
  TProductAPIGatewayCreateBatchInput,
  TProductAPIGatewayUpdateBatchInput,
} from '@/@core/crm/products/domain/gateway/product-api/product-api.gateway.dto'
import { ProductAPIInMemoryRepository } from '@/@core/crm/products/infra/hubspot/in-memory/product-api-in-memory.repository'

describe('ProductAPIInMemoryRepository unit tests', () => {
  let sut: ProductAPIInMemoryRepository

  beforeEach(() => {
    sut = new ProductAPIInMemoryRepository()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
    expect(sut.createBatch).toBeDefined()
    expect(sut.findAll).toBeDefined()
    expect(sut.updateBatch).toBeDefined()
  })

  it('Deve criar os produtos', async () => {
    const products: TProductAPIGatewayCreateBatchInput = [
      {
        data: aProduct().build(),
      },
    ]

    await sut.createBatch(products)
    expect(sut.items.length).toBe(1)
  })

  it('Deve atualizar os produtos', async () => {
    const product = aProduct().build()

    const products: TProductAPIGatewayCreateBatchInput = [
      {
        data: product,
      },
    ]

    await sut.createBatch(products)

    product.changePrice(100)

    const productsUpdate: TProductAPIGatewayUpdateBatchInput = [
      {
        id: '1',
        data: product,
      },
    ]

    await sut.updateBatch(productsUpdate)

    expect(sut.items[0].data.price).toBe(100)
    expect(sut.items.length).toBe(1)
  })

  it('Deve buscar todos os produtos', async () => {
    const products: TProductAPIGatewayCreateBatchInput = [
      {
        data: aProduct().build(),
      },
      {
        data: aProduct().build(),
      },
    ]

    await sut.createBatch(products)

    const response = await sut.findAll()

    expect(response.length).toBe(2)
  })
})
