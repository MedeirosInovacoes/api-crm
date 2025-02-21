import { UpdateAllDeliveryDatesUseCase } from '@/@core/crm/deals/application/usecases/update-all-delivery-dates/update-all-delivery-dates.usecase'
import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { FindAllDeliveryDetailUseCase } from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.usecase'
import { FusionInMemoryRepository } from '@/@core/fusion/infra/in-memory/fusion-in-memory.repository'
jest.mock('@/@core/@shared/infra/env', () => ({
  env: {
    FUSION_LOGIN: 'teste',
    FUSION_PASSWORD: 'teste',
    FUSION_URL: 'teste',
  },
}))
describe('UpdateAllDeliveryDatesUsecase unit tests', () => {
  let dealRepository: DealGateway
  let fusionFacade: FusionFacade
  let updateAllDeliveryDatesUseCase: UpdateAllDeliveryDatesUseCase

  beforeEach(() => {
    dealRepository = {
      findAll: jest.fn().mockResolvedValue(DealFakeBuilder.theDeals(15).build()),
      updateBatch: jest.fn(),
      createBatch: jest.fn(),
    }
    const fusionRepository = new FusionInMemoryRepository()
    const deliveryDetailUseCase = new FindAllDeliveryDetailUseCase(fusionRepository)
    fusionFacade = new FusionFacade(deliveryDetailUseCase)

    updateAllDeliveryDatesUseCase = new UpdateAllDeliveryDatesUseCase(dealRepository, fusionFacade)
  })

  it('Deve chamar o metodo findAll do dealRepository', async () => {
    const spyFunction = jest.spyOn(dealRepository, 'findAll')
    await updateAllDeliveryDatesUseCase.execute()

    expect(spyFunction).toHaveBeenCalledTimes(1)
  })

  it('Deve chamar o metodo findAllDeliveryDetail do fusionFacade', async () => {
    const spyFunction = jest.spyOn(fusionFacade, 'findAllDeliveryDetail')
    await updateAllDeliveryDatesUseCase.execute()

    expect(spyFunction).toHaveBeenCalledTimes(1)
  })

  it('Deve chamar a função updateBatch do dealRepository', async () => {
    const spyFunction = jest.spyOn(dealRepository, 'updateBatch')
    await updateAllDeliveryDatesUseCase.execute()

    expect(spyFunction).toHaveBeenCalledTimes(1)
  })

  it('Deve ter 2000 items no array data', async () => {
    await updateAllDeliveryDatesUseCase.execute()

    expect(updateAllDeliveryDatesUseCase.data.length).toBe(15)
  })
})
