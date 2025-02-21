import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { FindAllCustomersAndOrdersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.usecase'
import { FindAllCustomersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.usecase'
import { FindAllOrdersUsecase } from '@/@core/crm/customers/application/usecases/find-all-orders/find-all-orders.usecase'
import { CustomerDataBaseRepository } from '@/@core/crm/customers/infra/db/repository/customer.repository'

export class CustomerFacadeFactory {
  static create(): CustomerFacade {
    const customerRepository = new CustomerDataBaseRepository()
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
  }
}
