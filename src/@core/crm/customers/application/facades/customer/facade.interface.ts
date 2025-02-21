import { FindAllCustomersAndOrdersInputDto } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.dto'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { FindAllCustomersFilter } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'

export type CustomerFacadeFindAllInput = FindAllCustomersFilter
export type CustomerFacadeFindAllOutput = CustomerEntity[]

export type CustomerFacadeFindAllLeadsRetrievalOutput = CustomerEntity[]
export type FindAllFacadeCustomersAndOrdersInput = FindAllCustomersAndOrdersInputDto

export interface CustomerFacadeInterface {
  findAll(input?: CustomerFacadeFindAllInput): Promise<CustomerFacadeFindAllOutput>
  findAllLeadsRetrieval(): Promise<CustomerFacadeFindAllLeadsRetrievalOutput>
  findAllAndOrders(input?: FindAllFacadeCustomersAndOrdersInput): Promise<CustomerEntity[]>
  findAllOrders(): Promise<OrderEntity[]>
}
