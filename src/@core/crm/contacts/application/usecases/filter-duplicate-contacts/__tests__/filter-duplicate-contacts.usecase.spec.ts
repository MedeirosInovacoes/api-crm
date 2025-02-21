import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { FilterDuplicateContactsUseCase } from '@/@core/crm/contacts/application/usecases/filter-duplicate-contacts/filter-duplicate-contacts.usecase'

describe('FilterDuplicateContactsUsecase unit tests', () => {
  it('Deve salvar o contato filial com email associado quando o contato principal ainda não existo no CRM', () => {
    const usecase = new FilterDuplicateContactsUseCase()

    const result = usecase.execute({
      contactsInCrm: [],
      newContacts: [
        new ContactEntity({
          name: 'John 2',
          customerCode: 3122,
          customerPrimaryCode: 1222,
          email: 'teste5555@gmail.com',
        }),
      ],
    })

    if (result.isRight()) {
      expect(result.value[0].email).toEqual('')
      expect(result.value[0].associatedEmail).toEqual('teste5555@gmail.com')
      expect(result.value[0].invalidEmail).toEqual('')
    }
  })

  it('Deve retornar o contato matriz com email quando o contato filial já existir no CRM', () => {
    const usecase = new FilterDuplicateContactsUseCase()

    const result = usecase.execute({
      contactsInCrm: [
        new ContactEntity({
          name: 'John 2',
          customerCode: 3122,
          customerPrimaryCode: 1222,
          email: '',
          associatedEmail: 'teste5555@gmail.com',
        }),
      ],
      newContacts: [
        new ContactEntity({
          name: 'John 2',
          customerCode: 1222,
          customerPrimaryCode: 1222,
          email: 'teste5555@gmail.com',
        }),
      ],
    })

    if (result.isRight()) {
      expect(result.value[0].email).toEqual('teste5555@gmail.com')
      expect(result.value[0].associatedEmail).toEqual('')
      expect(result.value[0].invalidEmail).toEqual('')
    }
  })

  it('Deve retornar apenas um contato matriz com email quando dois contatos matriz tem o mesmo email', () => {
    const usecase = new FilterDuplicateContactsUseCase()

    const result = usecase.execute({
      contactsInCrm: [
        new ContactEntity({
          name: 'John 1',
          customerCode: 4444,
          customerPrimaryCode: 4444,
          email: 'teste2222@gmail.com',
        }),
      ],
      newContacts: [
        new ContactEntity({
          name: 'John 1',
          customerCode: 1222,
          customerPrimaryCode: 1222,
          email: 'teste5555@gmail.com',
        }),
        new ContactEntity({
          name: 'John 2',
          customerCode: 3122,
          customerPrimaryCode: 3122,
          email: 'teste5555@gmail.com',
        }),
        new ContactEntity({
          name: 'John 1',
          customerCode: 1111,
          customerPrimaryCode: 1111,
          email: 'teste2222@gmail.com',
        }),
      ],
    })

    if (result.isRight()) {
      expect(result.value[0].email).toEqual('teste5555@gmail.com')
      expect(result.value[0].associatedEmail).toEqual('')
      expect(result.value[0].invalidEmail).toEqual('')
      expect(result.value[1].email).toEqual('')
      expect(result.value[1].associatedEmail).toEqual('')
      expect(result.value[1].invalidEmail).toEqual('')
      expect(result.value[2].email).toEqual('')
      expect(result.value[2].associatedEmail).toEqual('')
      expect(result.value[2].invalidEmail).toEqual('')
    }
  })

  it('teste', () => {
    const usecase = new FilterDuplicateContactsUseCase()

    const result = usecase.execute({
      contactsInCrm: [
        new ContactEntity({
          name: 'John 1',
          customerCode: 4444,
          customerPrimaryCode: 4444,
          email: 'teste2222@gmail.com',
        }),
        new ContactEntity({
          name: 'John 1',
          customerCode: 4442,
          customerPrimaryCode: 4444,
          associatedEmail: 'teste2222@gmail.com',
        }),
        new ContactEntity({
          name: 'John 1',
          customerCode: 4441,
          customerPrimaryCode: 4444,
          associatedEmail: 'teste2222@gmail.com',
        }),
      ],
      newContacts: [
        new ContactEntity({
          name: 'John 1',
          customerCode: 4444,
          customerPrimaryCode: 4444,
          email: 'teste2222@gmail.com',
        }),
        new ContactEntity({
          name: 'John 1',
          customerCode: 4442,
          customerPrimaryCode: 4444,
          email: 'teste2222@gmail.com',
        }),
        new ContactEntity({
          name: 'John 1',
          customerCode: 4441,
          customerPrimaryCode: 4444,
          email: 'teste2222@gmail.com',
        }),
      ],
    })

    if (result.isRight()) {
      expect(result.value[0].email).toEqual('teste2222@gmail.com')
      expect(result.value[0].associatedEmail).toEqual('')
      expect(result.value[1].email).toEqual('')
      expect(result.value[1].associatedEmail).toEqual('teste2222@gmail.com')
      expect(result.value[2].email).toEqual('')
      expect(result.value[2].associatedEmail).toEqual('teste2222@gmail.com')
    }
  })
})
