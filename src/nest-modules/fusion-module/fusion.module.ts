import { FusionEventModel } from '@/@core/fusion/infra/models/fusion-events.model'
import { FUSION_FACADE_PROVIDERS } from '@/nest-modules/fusion-module/providers/fusion.facade.provider'
import { FUSION_REPOSITORY_PROVIDERS } from '@/nest-modules/fusion-module/providers/fusion.repository.provider'
import { FUSION_USECASE_PROVIDERS } from '@/nest-modules/fusion-module/providers/fusion.usecase.provider'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([FusionEventModel])],
  controllers: [],
  providers: [
    ...Object.values(FUSION_USECASE_PROVIDERS),
    ...Object.values(FUSION_REPOSITORY_PROVIDERS),
    ...Object.values(FUSION_FACADE_PROVIDERS),
  ],
  exports: [...Object.values(FUSION_FACADE_PROVIDERS)],
})
export class FusionModule {}
