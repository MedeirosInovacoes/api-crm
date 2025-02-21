import { CustomerGateway } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'
import {
  FindAllCustomersInput,
  FindAllCustomersOutput,
} from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.dto'

export class FindAllCustomersUseCase {
  constructor(private readonly customerRepository: CustomerGateway) {}

  execute = async (input?: FindAllCustomersInput): Promise<FindAllCustomersOutput> => {
    return this.customerRepository.findAll(input)
  }
}
