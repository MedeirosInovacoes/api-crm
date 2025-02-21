import {
  CustomerFacadeFindAllInput,
  CustomerFacadeFindAllLeadsRetrievalOutput,
  CustomerFacadeFindAllOutput,
  CustomerFacadeInterface,
  FindAllFacadeCustomersAndOrdersInput,
} from '@/@core/crm/customers/application/facades/customer/facade.interface'
import { FindAllCustomersAndOrdersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.usecase'
import { FindAllCustomersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.usecase'
import { FindAllOrdersUsecase } from '@/@core/crm/customers/application/usecases/find-all-orders/find-all-orders.usecase'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { CustomerGateway } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'

export class CustomerFacade implements CustomerFacadeInterface {
  constructor(
    private readonly findAllCustomersUseCase: FindAllCustomersUseCase,
    private readonly findAllCustomersAndOrdersUseCase: FindAllCustomersAndOrdersUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUsecase,
    private readonly customerRepository: CustomerGateway,
  ) {}

  findAllLeadsRetrieval = async (): Promise<CustomerFacadeFindAllLeadsRetrievalOutput> => {
    return this.customerRepository.findAllLeadsRetrieval()
  }

  findAll = async (input?: CustomerFacadeFindAllInput): Promise<CustomerFacadeFindAllOutput> => {
    return await this.findAllCustomersUseCase.execute(input)
  }

  findAllAndOrders = async (
    input?: FindAllFacadeCustomersAndOrdersInput,
  ): Promise<CustomerEntity[]> => {
    return this.findAllCustomersAndOrdersUseCase.execute(input)
  }

  findAllOrders = async (): Promise<OrderEntity[]> => {
    return this.findAllOrdersUseCase.execute()
  }
}
