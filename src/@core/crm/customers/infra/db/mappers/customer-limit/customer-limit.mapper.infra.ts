import { CustomerLimitInterface } from '@/@core/crm/customers/application/interfaces/customer.interface'
import { ShowCustomerLimitRepositoryQueryResponse } from '@/@core/crm/customers/infra/db/interfaces/customer.interface'

export type CustomerLimitInfraMapperInputDto = {
  limit: ShowCustomerLimitRepositoryQueryResponse
}

export type CustomerLimitInfraMapperOutputDto = {
  limit: CustomerLimitInterface
}
