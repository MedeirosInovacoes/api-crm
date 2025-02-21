import { CrmModule } from '@/nest-modules/crm-module/crm.module'
import { DatabaseModule } from '@/nest-modules/database-module/database.module'
import { FusionModule } from '@/nest-modules/fusion-module/fusion.module'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, CrmModule, FusionModule],
})
export class AppModule {}
