import { CustomerGateway } from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'

export type CustomerFacadeFactoryCreateInput = {
  customerRepository?: CustomerGateway
}
