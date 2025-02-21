import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'
import { CustomerDataBaseRepository } from '@/@core/crm/customers/infra/db/repository/customer.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

const customerDatabaseRepositoryProvider = {
  provide: CustomerDataBaseRepository,
  useFactory: (customerModel: Repository<CustomerModel>, orderModel: Repository<OrderModel>) =>
    new CustomerDataBaseRepository(customerModel, orderModel),
  inject: [getRepositoryToken(CustomerModel), getRepositoryToken(OrderModel)],
}

export const CUSTOMERS_REPOSITORY_PROVIDERS = {
  CUSTOMER_DATABASE_REPOSITORY: customerDatabaseRepositoryProvider,
}
