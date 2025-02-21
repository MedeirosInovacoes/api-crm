import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { FindAllCustomersAndOrdersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers-and-orders/find-all-customers-and-orders.usecase'
import { FindAllCustomersUseCase } from '@/@core/crm/customers/application/usecases/find-all-customers/find-all-customers.usecase'
import { FindAllOrdersUsecase } from '@/@core/crm/customers/application/usecases/find-all-orders/find-all-orders.usecase'
import { CustomerFakeBuilder } from '@/@core/crm/customers/domain/fake-builders/customer-fake.builder'

describe('CustomerFacade unit tests', () => {
  const customerFacadeRepositoryMock = {
    findAllOrders: jest.fn(),
    findAllLimits: jest.fn().mockResolvedValue(
      Array.from({ length: 10 }, (_, index) => ({
        availableLimit: index + 1,
        customerCode: index + 1,
        limit: index + 1,
        billingBranchCode: index + 1,
      })),
    ),
    findAll: jest.fn().mockResolvedValue(CustomerFakeBuilder.theCustomer(10).build()),
  }
  it('Deve retornar uma lista de clientes', async () => {
    const findAllCustomersUseCase = new FindAllCustomersUseCase(customerFacadeRepositoryMock)
    const findAllCustomersAndOrdersUseCase = new FindAllCustomersAndOrdersUseCase(
      customerFacadeRepositoryMock,
    )
    const findAllOrdersUseCase = new FindAllOrdersUsecase(customerFacadeRepositoryMock)

    const customerFacade = new CustomerFacade(
      findAllCustomersUseCase,
      findAllCustomersAndOrdersUseCase,
      findAllOrdersUseCase,
    )

    const response = await customerFacade.findAll()

    expect(response).toHaveLength(10)
  })

  it('Deve chamar o método findAllCustomersUseCase.execute', async () => {
    const findAllCustomersUseCase = new FindAllCustomersUseCase(customerFacadeRepositoryMock)
    const findAllCustomersAndOrdersUseCase = new FindAllCustomersAndOrdersUseCase(
      customerFacadeRepositoryMock,
    )
    const findAllOrdersUseCase = new FindAllOrdersUsecase(customerFacadeRepositoryMock)
    const findAllCustomersUseCaseSpy = jest.spyOn(findAllCustomersUseCase, 'execute')

    const customerFacade = new CustomerFacade(
      findAllCustomersUseCase,
      findAllCustomersAndOrdersUseCase,
      findAllOrdersUseCase,
    )

    await customerFacade.findAll()

    expect(findAllCustomersUseCaseSpy).toHaveBeenCalled()
  })
})
