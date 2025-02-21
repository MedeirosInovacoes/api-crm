import { CustomerLimitInterface } from '@/@core/crm/customers/application/interfaces/customer.interface'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'

export type CustomerInfraMapperInputDto = {
  customer: CustomerModel
  limits: CustomerLimitInterface[]
  channels: ChannelFromFile[]
}

export type CustomerInfraMapperOutputDto = CustomerEntity

export type ChannelFromFile = {
  channelName: string
  activityCode: number
  activityName: string
}
