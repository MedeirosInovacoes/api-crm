import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'
import { CreateContactsBatchUseCase } from '@/@core/crm/contacts/application/usecases/create-contacts-batch/create-contacts-batch.usecase'

const newContacts = [
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

describe('CreateContactsBatchUsecase unit tests', () => {
  it('Deve executar sem erros', async () => {
    const contactRepositoryMock = {
      createBatch: jest.fn(),
    }

    const useCase = new CreateContactsBatchUseCase(
      contactRepositoryMock as unknown as ContactGateway,
    )

    await expect(useCase.execute(newContacts)).resolves.not.toThrow()
  })

  it('Deve chamar createBatch 3 vezes com o tamanho correto dos batches', async () => {
    const contactRepositoryMock = {
      createBatch: jest.fn(),
    }

    const useCase = new CreateContactsBatchUseCase(
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

    expect(contactRepositoryMock.createBatch).toHaveBeenCalledTimes(3)
    expect(contactRepositoryMock.createBatch.mock.calls[0][0]).toHaveLength(100)
    expect(contactRepositoryMock.createBatch.mock.calls[1][0]).toHaveLength(100)
    expect(contactRepositoryMock.createBatch.mock.calls[2][0]).toHaveLength(50)
  })

  it('Deve chamar createBatch em lotes de 100', async () => {
    const contactRepositoryMock = {
      createBatch: jest.fn(),
    }

    const useCase = new CreateContactsBatchUseCase(
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

    expect(contactRepositoryMock.createBatch.mock.calls[0][0]).toHaveLength(100)
    expect(contactRepositoryMock.createBatch.mock.calls[1][0]).toHaveLength(100)
    expect(contactRepositoryMock.createBatch.mock.calls[2][0]).toHaveLength(50)
  })

  it('Deve criar as associações corretamente', async () => {
    const contactRepositoryMock = {
      createBatch: jest.fn(),
    }

    const useCase = new CreateContactsBatchUseCase(
      contactRepositoryMock as unknown as ContactGateway,
    )
    await useCase.execute(newContacts)

    expect(contactRepositoryMock.createBatch).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.any(ContactEntity),
          associations: expect.arrayContaining([
            expect.objectContaining({
              to: expect.objectContaining({ id: expect.any(String) }),
              types: expect.arrayContaining([
                expect.objectContaining({
                  category: expect.any(String),
                  typeId: expect.any(Number),
                }),
              ]),
            }),
          ]),
        }),
      ]),
    )
  })
})
