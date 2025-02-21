import { CheckExistContactInputDto } from '@/@core/crm/contacts/application/usecases/check-exist-contact/check-exist-contact.dto'

export class CheckExistContactUseCase {
  static execute = (input: CheckExistContactInputDto): { contactId: string | null } => {
    const existContact = input.contactsInCrm.find(
      (contact) => contact.customerCode === input.customerCode,
    )

    if (existContact) {
      return { contactId: existContact.id }
    }

    return { contactId: null }
  }
}
