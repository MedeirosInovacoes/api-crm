import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'
import { UpdateContactsBatchUseCase } from '@/@core/crm/contacts/application/usecases/update-contacts-batch/update-contacts-batch.usecase'

const contacts = [
  new ContactEntity({
    firstName: 'John',
    companyId: '1',
    email: 'john@example.com',
    customerCode: 1,
    customerPrimaryCode: 1,
  }),
  new ContactEntity({
    firstName: 'Jane',
    companyId: '2',
    email: 'jane@example.com',
    customerCode: 2,
    customerPrimaryCode: 2,
  }),
]

describe('UpdateContactsBatchUseCase unit tests', () => {
  it('Deve executar sem erros', async () => {
    const contactRepositoryMock = {
      updateBatch: jest.fn(),
    }

    const useCase = new UpdateContactsBatchUseCase(
      contactRepositoryMock as unknown as ContactGateway,
    )

    await expect(useCase.execute(contacts)).resolves.not.toThrow()
  })

  it('Deve chamar updateBatch 3 vezes com o tamanho correto dos batches', async () => {
    const contactRepositoryMock = {
      updateBatch: jest.fn(),
    }

    const useCase = new UpdateContactsBatchUseCase(
      contactRepositoryMock as unknown as ContactGateway,
    )

    const manyContacts = Array.from(
      { length: 250 },
      (_, index) =>
        new ContactEntity(
          {
            firstName: `Contact ${index + 1}`,
            companyId: `${index + 1}`,
            customerCode: index + 1,
            customerPrimaryCode: index + 1,
            email: `contact${index + 1}@example.com`,
          },
          `${index + 101}`,
        ),
    )

    await useCase.execute(manyContacts)

    expect(contactRepositoryMock.updateBatch).toHaveBeenCalledTimes(3)
    expect(contactRepositoryMock.updateBatch.mock.calls[0][0]).toHaveLength(100)
    expect(contactRepositoryMock.updateBatch.mock.calls[1][0]).toHaveLength(100)
    expect(contactRepositoryMock.updateBatch.mock.calls[2][0]).toHaveLength(50)
  })

  it('Deve chamar updateBatch em lotes de 100', async () => {
    const contactRepositoryMock = {
      updateBatch: jest.fn(),
    }

    const useCase = new UpdateContactsBatchUseCase(
      contactRepositoryMock as unknown as ContactGateway,
    )

    const manyContacts = Array.from(
      { length: 250 },
      (_, index) =>
        new ContactEntity(
          {
            firstName: `Contact ${index + 1}`,
            companyId: `${index + 1}`,
            customerCode: index + 1,
            customerPrimaryCode: index + 1,
            email: `contact${index + 1}@example.com`,
          },
          `${index + 101}`,
        ),
    )

    await useCase.execute(manyContacts)

    expect(contactRepositoryMock.updateBatch.mock.calls[0][0]).toHaveLength(100)
    expect(contactRepositoryMock.updateBatch.mock.calls[1][0]).toHaveLength(100)
    expect(contactRepositoryMock.updateBatch.mock.calls[2][0]).toHaveLength(50)
  })
})
