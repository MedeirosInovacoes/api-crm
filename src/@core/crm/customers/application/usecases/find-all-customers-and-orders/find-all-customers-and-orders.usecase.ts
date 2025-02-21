import { CustomerGateway } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { FindAllCustomersAndOrdersInputDto } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.dto'

export class FindAllCustomersAndOrdersUseCase {
  constructor(private readonly customerRepository: CustomerGateway) {}

  async execute(input?: FindAllCustomersAndOrdersInputDto): Promise<CustomerEntity[]> {
    return this.customerRepository.findAll({
      customersCode: input.customersCode,
      mostRecentOrder: true,
    })
  }
}
