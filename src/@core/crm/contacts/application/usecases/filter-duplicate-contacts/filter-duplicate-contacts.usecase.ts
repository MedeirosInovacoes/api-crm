import { right } from '@/@core/@shared/domain/errors/either'
import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import {
  FilterDuplicateContactsInputDto,
  FilterDuplicateContactsOutputDto,
} from '@/@core/crm/contacts/application/usecases/filter-duplicate-contacts/filter-duplicate-contacts.dto'

export class FilterDuplicateContactsUseCase
  implements UseCaseInterface<FilterDuplicateContactsInputDto, FilterDuplicateContactsOutputDto>
{
  execute(input: FilterDuplicateContactsInputDto): FilterDuplicateContactsOutputDto {
    const copy = [...input.newContacts]

    copy.forEach((newContact, index) => {
      const existingContactInCrm = input.contactsInCrm.find(
        (contact) => contact.email.length > 0 && contact.email === newContact.email,
      )

      const existingContactInNewContacts = input.newContacts.find(
        (contact) => contact.email.length > 0 && contact.email === newContact.email,
      )

      const existingContact = existingContactInCrm || existingContactInNewContacts

      if (newContact.customerCode !== newContact.customerPrimaryCode) {
        const primaryCompany = input.newContacts.find(
          (company) => company.customerCode === newContact.customerPrimaryCode,
        )

        const primaryEmail = primaryCompany?.email

        if (primaryEmail === newContact?.email || !newContact?.email) {
          copy[index].changeAssociatedEmail(primaryEmail)
          copy[index].changeEmail('')
        } else if (existingContact) {
          copy[index].changeAssociatedEmail(newContact.email)
          copy[index].changeEmail('')
        }

        return null
      }

      if (
        newContact.customerCode === newContact.customerPrimaryCode &&
        existingContact &&
        existingContact.customerCode !== newContact.customerCode
      ) {
        copy[index].changeAssociatedEmail('')
        copy[index].changeEmail('')
      }
    })

    const filteredList = copy.filter((company) => company != null && company !== undefined)

    return right(filteredList)
  }
}
