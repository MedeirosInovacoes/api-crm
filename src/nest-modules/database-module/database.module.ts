import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { DATABASE_SOURCE } from '@/nest-modules/database-module/database.config'
import { Global, Module, Scope } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

const models = [CustomerModel]

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(models), TypeOrmModule.forRoot(DATABASE_SOURCE.WINTHOR)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
