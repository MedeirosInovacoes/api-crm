import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { FindAllDeliveryDetailUseCase } from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.usecase'
import { FusionInMemoryRepository } from '@/@core/fusion/infra/in-memory/fusion-in-memory.repository'

describe('FusionFacadeFactory unit tests', () => {
  let facade: FusionFacade

  beforeAll(() => {
    const fusionRepository = new FusionInMemoryRepository()
    const deliveryDetailUseCase = new FindAllDeliveryDetailUseCase(fusionRepository)
    facade = new FusionFacade(deliveryDetailUseCase)
  })

  it('facade deve está definido', () => {
    expect(facade).toBeDefined()
  })
  it('Deve retornar uma lista de entity DeliveryDetailEntity', async () => {
    const ordersId = [11, 31, 521, 31]
    const deliveryDetail = await facade.findAllDeliveryDetail({ ordersId })

    expect(deliveryDetail.length).toBe(ordersId.length)
    expect(deliveryDetail[0].orderId).toBe(ordersId[0])
    expect(deliveryDetail[0].id).toBeDefined()
    expect(deliveryDetail[0].date).toBeDefined()
  })
})
