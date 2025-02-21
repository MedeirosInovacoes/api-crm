import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'
import { AssociateContactsWithContactsBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contact-with-contact-batch/associate-contact-with-contact-batch.dto'

export class AssociateContactWithContactBatchUseCase
  implements UseCaseInterface<void, Promise<void>>
{
  constructor(private readonly contactRepository: ContactGateway) {}

  async execute(): Promise<void> {
    const contactsResponse = await this.contactRepository.findAll()
    let inputs: AssociateContactsWithContactsBatchInputDto[] = []

    const contactPrimaryCode = contactsResponse.filter(
      (contact) => contact.customerCode === contact.customerPrimaryCode,
    )

    const contacts = contactsResponse
      .map((contact) => {
        const match = contactPrimaryCode.find(
          (value) =>
            contact.customerPrimaryCode === value.customerCode &&
            contact.customerCode !== value.customerPrimaryCode,
        )

        if (match) {
          return { primary: contact, secondary: match }
        }

        return null
      })
      .filter((value) => value !== null)

    for (const contact of contacts) {
      const index = contacts.indexOf(contact) + 1

      inputs.push({
        contactPrimaryId: contact.primary.id,
        contactSecondaryId: contact.secondary.id,
      })

      if (inputs.length === 100 || index === contacts.length) {
        await this.contactRepository.associateBatch(inputs)
        inputs = []
      }
    }
  }
}
