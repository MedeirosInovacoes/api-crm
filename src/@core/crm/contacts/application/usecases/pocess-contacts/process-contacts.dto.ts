import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'

export type ProcessContactsInputDto = {
  updateContacts: ContactEntity[]
  createContacts: ContactEntity[]
}
