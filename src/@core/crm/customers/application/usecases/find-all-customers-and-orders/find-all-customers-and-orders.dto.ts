import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'

export type FindAllCustomersAndOrdersInputDto = {
  customersCode: number[]
}
export type FindAllCustomersAndOrdersOutputDto = CustomerEntity[]
