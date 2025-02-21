import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { FindAllCustomersAndOrdersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.usecase'
import { FindAllCustomersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.usecase'
import { FindAllOrdersUsecase } from '@/@core/crm/customers/application/usecases/find-all-orders/find-all-orders.usecase'
import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'
import { CustomerDataBaseRepository } from '@/@core/crm/customers/infra/db/repository/customer.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

const customerFacadeProvider = {
  provide: CustomerFacade,
  useFactory: (customerModel: Repository<CustomerModel>, orderModel: Repository<OrderModel>) => {
    const customerRepository = new CustomerDataBaseRepository(customerModel, orderModel)
    const findAllCustomersUseCase = new FindAllCustomersUseCase(customerRepository)
    const findAllCustomersAndOrdersUseCase = new FindAllCustomersAndOrdersUseCase(
      customerRepository,
    )
    const findAllOrdersUseCase = new FindAllOrdersUsecase(customerRepository)

    return new CustomerFacade(
      findAllCustomersUseCase,
      findAllCustomersAndOrdersUseCase,
      findAllOrdersUseCase,
      customerRepository,
    )
  },
  inject: [getRepositoryToken(CustomerModel), getRepositoryToken(OrderModel)],
}

export const CUSTOMERS_FACADE_PROVIDERS = {
  CUSTOMER_FACADE: customerFacadeProvider,
}
