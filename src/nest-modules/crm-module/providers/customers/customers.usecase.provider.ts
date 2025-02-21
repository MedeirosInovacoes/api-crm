import { FindAllCustomersAndOrdersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.usecase'
import { FindAllCustomersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.usecase'
import { CustomerGateway } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'
import { CUSTOMERS_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.facade.provider'

const findAllCustomersUseCaseProvider = {
  provide: FindAllCustomersUseCase,
  useFactory: (customerRepository: CustomerGateway) =>
    new FindAllCustomersUseCase(customerRepository),
  inject: [CUSTOMERS_FACADE_PROVIDERS.CUSTOMER_FACADE.provide],
}

const findAllCustomersAndOrdersUseCaseProvider = {
  provide: FindAllCustomersAndOrdersUseCase,
  useFactory: (customerRepository: CustomerGateway) =>
    new FindAllCustomersAndOrdersUseCase(customerRepository),
  inject: [CUSTOMERS_FACADE_PROVIDERS.CUSTOMER_FACADE.provide],
}

export const CUSTOMERS_USECASES_PROVIDERS = {
  FIND_ALL_CUSTOMERS_USE_CASE: findAllCustomersUseCaseProvider,
  FIND_ALL_CUSTOMERS_AND_ORDERS_USE_CASE: findAllCustomersAndOrdersUseCaseProvider,
}
