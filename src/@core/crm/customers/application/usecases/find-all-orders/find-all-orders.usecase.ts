import { FindAllOrdersOutputDto } from '@/@core/crm/customers/application/usecases/find-all-orders/find-all-orders.dto'
import { CustomerGateway } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'

export class FindAllOrdersUsecase {
  constructor(private readonly customerGateway: CustomerGateway) {}

  async execute(): Promise<FindAllOrdersOutputDto> {
    return this.customerGateway.findAllOrders()
  }
}
