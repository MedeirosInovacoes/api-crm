import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { FindAllCustomersFilter } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'

export type FindAllCustomersInput = FindAllCustomersFilter

export type FindAllCustomersOutput = CustomerEntity[]
