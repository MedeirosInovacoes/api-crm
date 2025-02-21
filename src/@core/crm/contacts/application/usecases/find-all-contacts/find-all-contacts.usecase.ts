import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'

export class FindAllContactsUseCase implements UseCaseInterface<void, ContactEntity[]> {
  constructor(private readonly contactRepository: ContactGateway) {}

  execute = async (): Promise<ContactEntity[]> => {
    const response = await this.contactRepository.findAll()

    return response
  }
}
