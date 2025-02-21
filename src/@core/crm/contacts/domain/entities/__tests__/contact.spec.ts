import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'

describe('ContactEntity unit tests', () => {
  it('Deve criar uma nova instância de ContactEntity', () => {
    const contact = new ContactEntity({
      name: 'John',
      customerCode: 1231,
      customerPrimaryCode: 1232,
      phone: '86995729999',
    })

    expect(contact.phone).toEqual('+55-86-99572-9999')
  })
})
