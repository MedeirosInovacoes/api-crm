import { CustomerLimitInterface } from '@/@core/crm/customers/application/interfaces/customer.interface'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { FindAllCustomersLeadsRetrievalOutput } from '@/@core/crm/customers/domain/gateway/customer/customer-gateway.dto'

export type CustomerGateway = {
  findAllLimits(): Promise<CustomerLimitInterface[]>
  findAll(filters?: FindAllCustomersFilter): Promise<CustomerEntity[]>
  findAllOrders(): Promise<OrderEntity[]>
  findAllLeadsRetrieval(): Promise<FindAllCustomersLeadsRetrievalOutput>
}

export type FindAllCustomersFilter = {
  mostRecentOrder?: boolean
  customersCode?: number[]
  orgin?: string
}
