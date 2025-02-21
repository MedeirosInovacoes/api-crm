import { Either } from '@/@core/@shared/domain/errors/either'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'

export type FilterDuplicateContactsInputDto = {
  contactsInCrm: ContactEntity[]
  newContacts: ContactEntity[]
}

export type FilterDuplicateContactsOutputDto = Either<void, ContactEntity[]>
