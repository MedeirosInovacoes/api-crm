import { FusionInMemoryRepository } from '@/@core/fusion/infra/in-memory/fusion-in-memory.repository'

describe('FusionInMemoryRepository Unit tests', () => {
  describe('DeliveryDetail', () => {
    it('Deve retornar um objeto com os dados da entrega', async () => {
      const ordersId = [123123, 2323, 231]
      const fusionRepository = new FusionInMemoryRepository()

      const deliveryDetail = await fusionRepository.findAllDeliveriesDetails({ ordersId })

      expect(deliveryDetail.length).toBe(ordersId.length)
      expect(deliveryDetail[0].orderId).toBe(ordersId[0])
      expect(deliveryDetail[0].id).toBeDefined()
      expect(deliveryDetail[0].date).toBeDefined()
    })

    it('Deve retornar uma lista vazia caso ordersId não exista', async () => {
      const ordersId = []
      const fusionRepository = new FusionInMemoryRepository()

      const deliveryDetail = await fusionRepository.findAllDeliveriesDetails({ ordersId })

      expect(deliveryDetail.length).toBe(0)
    })
  })
})
