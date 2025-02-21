import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { CheckExistContactUseCase } from '@/@core/crm/contacts/application/usecases/check-exist-contact/check-exist-contact.usecase'

const contactsInCrm = [
  new ContactEntity(
    {
      name: 'John',
      companyId: '1',
      email: 'john@example.com',
      customerCode: 1,
      customerPrimaryCode: 1,
    },
    '23123',
  ),
  new ContactEntity(
    {
      name: 'Jane',
      companyId: '2',
      email: 'jane@example.com',
      customerCode: 2,
      customerPrimaryCode: 2,
    },
    '31232',
  ),
]

describe('CheckExistContactUsecase unit tests', () => {
  it('Deve retornar id se o contato existir', async () => {
    const result = CheckExistContactUseCase.execute({
      customerCode: 2,
      contactsInCrm,
    })

    expect(result.contactId).toEqual('31232')
  })

  it('Deve retornar id null se o contato não existir', async () => {
    const result = CheckExistContactUseCase.execute({
      customerCode: 222,
      contactsInCrm,
    })

    expect(result.contactId).toEqual(null)
  })
})
