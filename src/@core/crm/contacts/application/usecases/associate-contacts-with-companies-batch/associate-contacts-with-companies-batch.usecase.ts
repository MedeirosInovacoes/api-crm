import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'
import { AssociateContactsWithCompaniesBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.dto'

export class AssociateContactsWithCompaniesBatchUsecase
  implements UseCaseInterface<AssociateContactsWithCompaniesBatchInputDto[], void>
{
  constructor(private readonly contactRepository: ContactGateway) {}

  async execute(associations: AssociateContactsWithCompaniesBatchInputDto[]): Promise<void> {
    let inputs: AssociateContactsWithCompaniesBatchInputDto[] = []

    for (const association of associations) {
      const indexOf = associations.indexOf(association) + 1
      inputs.push(association)

      if (inputs.length === 100 || indexOf === associations.length) {
        await this.contactRepository.associateWithCompaniesBatch(inputs)
        inputs = []
      }
    }
  }
}
