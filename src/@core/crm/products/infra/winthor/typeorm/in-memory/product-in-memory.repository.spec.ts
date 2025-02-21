import { ProductDBInMemoryRepository } from '@/@core/crm/products/infra/winthor/typeorm/in-memory/product-in-memory.repository'

describe('ProductInMemoryRepository unit tests', () => {
  let sut: ProductDBInMemoryRepository

  beforeEach(() => {
    sut = new ProductDBInMemoryRepository()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should return a list of products', async () => {
    const response = await sut.findAll()

    expect(response).toHaveLength(200)
  })
})
