import { FusionInMemoryRepository } from '@/@core/fusion/infra/in-memory/fusion-in-memory.repository'

describe('FindAllDeliveryDetailUsecase unit tests', () => {
  let fusionRepository: FusionInMemoryRepository

  beforeAll(() => {
    fusionRepository = new FusionInMemoryRepository()
  })

  it('Deve retornar um objeto com os dados da entrega', async () => {
    const ordersId = [123123]
    const deliveryDetail = await fusionRepository.findAllDeliveriesDetails({ ordersId })

    expect(deliveryDetail.length).toBe(ordersId.length)
    expect(deliveryDetail[0].orderId).toBe(ordersId[0])
    expect(deliveryDetail[0].id).toBeDefined()
    expect(deliveryDetail[0].date).toBeDefined()
  })

  it('Deve retornar uma lista vazia caso orderId não exista', async () => {
    const ordersId = []
    const deliveryDetail = await fusionRepository.findAllDeliveriesDetails({ ordersId })

    expect(deliveryDetail.length).toBe(0)
  })
})
