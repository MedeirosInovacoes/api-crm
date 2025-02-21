import { FusionEventModel } from '@/@core/fusion/infra/models/fusion-events.model'
import { FusionDBRepository } from '@/@core/fusion/infra/repository/fusion-db.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

const fusionDBRepositoryProvider = {
  provide: FusionDBRepository,
  useFactory: (fusionEventModel: Repository<FusionEventModel>) => {
    return new FusionDBRepository(fusionEventModel)
  },
  inject: [getRepositoryToken(FusionEventModel)],
}

export const FUSION_REPOSITORY_PROVIDERS = {
  FUSION_DB_REPOSITORY: fusionDBRepositoryProvider,
}
