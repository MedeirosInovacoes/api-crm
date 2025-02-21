import { FindAllCustomersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.usecase'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { CustomerFakeBuilder } from '@/@core/crm/customers/domain/fake-builders/customer-fake.builder'

describe('FindAllCustomersUseCase unit test', () => {
  const mockCustomerRepository = {
    findAllLimits: jest.fn(),
    findAll: jest.fn().mockResolvedValue(CustomerFakeBuilder.theCustomer(3).build()),
    findAllOrders: jest.fn(),
  }
  it('should return a list of customers', async () => {
    const usecase = new FindAllCustomersUseCase(mockCustomerRepository)

    const response = await usecase.execute()

    expect(response).toHaveLength(3)
    expect(response[0]).toBeInstanceOf(CustomerEntity)
  })

  it('Deve retornar corretamento o resultado', async () => {
    const usecase = new FindAllCustomersUseCase(mockCustomerRepository)

    const response = await usecase.execute()

    expect(response[0]).toEqual((await mockCustomerRepository.findAll())[0])
  })
})
