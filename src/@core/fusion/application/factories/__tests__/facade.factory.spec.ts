import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { FusionFacadeFactory } from '@/@core/fusion/application/factories/facade.factory'
import { FusionDBGateway } from '@/@core/fusion/domain/gateways/fusion-db.gateway'
import { FusionDBRepository } from '@/@core/fusion/infra/repository/fusion-db.repository'
jest.mock('@/@core/@shared/infra/env', () => ({
  env: {
    FUSION_LOGIN: 'teste',
    FUSION_PASSWORD: 'teste',
    FUSION_URL: 'teste',
  },
}))
describe('FusionFacadeFactory unit tests', () => {
  let fusionDBRepository: FusionDBGateway

  beforeEach(() => {
    fusionDBRepository = new FusionDBRepository(null)
  })

  it('Deve retornar uma instancia de FusionFacade', () => {
    const facade = FusionFacadeFactory.create({ fusionDBRepository })
    expect(facade).toBeInstanceOf(FusionFacade)
  })
})
