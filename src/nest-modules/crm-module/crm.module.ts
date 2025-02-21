import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'
import { ProductModel } from '@/@core/crm/products/infra/winthor/typeorm/models/product.model'
import { CrmController } from '@/nest-modules/crm-module/crm.controller'
import { COMPANIES_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.facade.provider'
import { COMPANIES_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.repository.provider'
import { COMPANIES_USECASE_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.usecase.provider'
import { CONTACTS_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/contacts/contacts.repository'
import { CRM_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/crm.repositories.provider'
import { CUSTOMERS_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.facade.provider'
import { CUSTOMERS_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.repository.provider'
import { CUSTOMERS_USECASES_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.usecase.provider'
import { DEAL_REPOSITORIES_PROVIDERS } from '@/nest-modules/crm-module/providers/deals/deal.repository.provider'
import { DEAL_USECASES_PROVIDERS } from '@/nest-modules/crm-module/providers/deals/deal.usecase.provider'
import { PRODUCTS_REPOSITORIES_PROVIDERS } from '@/nest-modules/crm-module/providers/products/product.repositories.provider'
import { PRODUCTS_USECASES_PROVIDERS } from '@/nest-modules/crm-module/providers/products/product.usecases.provider'
import { PRODUCTS_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/products/products.facade.provider'
import DATABASE_SOURCE_WINTHOR from '@/nest-modules/database-module/database-source-winthor'
import { FusionModule } from '@/nest-modules/fusion-module/fusion.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerModel, ProductModel, OrderModel], DATABASE_SOURCE_WINTHOR),
    FusionModule,
  ],
  controllers: [CrmController],
  providers: [
    ...Object.values(CRM_REPOSITORY_PROVIDERS),
    ...Object.values(PRODUCTS_REPOSITORIES_PROVIDERS),
    ...Object.values(PRODUCTS_USECASES_PROVIDERS),
    ...Object.values(PRODUCTS_FACADE_PROVIDERS),
    ...Object.values(DEAL_USECASES_PROVIDERS),
    ...Object.values(DEAL_REPOSITORIES_PROVIDERS),
    ...Object.values(CUSTOMERS_REPOSITORY_PROVIDERS),
    ...Object.values(CUSTOMERS_USECASES_PROVIDERS),
    ...Object.values(CUSTOMERS_FACADE_PROVIDERS),
    ...Object.values(COMPANIES_USECASE_PROVIDERS),
    ...Object.values(COMPANIES_REPOSITORY_PROVIDERS),
    ...Object.values(COMPANIES_FACADE_PROVIDERS),
    ...Object.values(CONTACTS_REPOSITORY_PROVIDERS),
  ],
})
export class CrmModule {}
