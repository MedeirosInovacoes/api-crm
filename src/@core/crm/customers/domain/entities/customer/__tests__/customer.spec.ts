import {
  CustomerEntity,
  CustomerEntityProps,
} from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { CustomerFakeBuilder } from '@/@core/crm/customers/domain/fake-builders/customer-fake.builder'

const mockCustomerProps: CustomerEntityProps = CustomerFakeBuilder.aCustomer().build()

describe('CustomerEntity unit test', () => {
  it('should create a company', () => {
    const entity = new CustomerEntity(mockCustomerProps)

    expect(entity.toJson()).toEqual(mockCustomerProps)
  })
})
