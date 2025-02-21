import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export type CreateBatchDealsRecurrentsInputDto = {
  deal: DealEntity
  customer: CustomerEntity
  companies: CompanyEntity[]
  products: ProductEntity[]
}[]

export type CreateBatchDealsRecurrentsOutputDto = void
