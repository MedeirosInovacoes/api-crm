import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import { AssociateContactWithContactBatchUseCase } from '@/@core/crm/contacts/application/usecases/associate-contact-with-contact-batch/associate-contact-with-contact-batch.usecase'
import { ProcessContactsInputDto } from '@/@core/crm/contacts/application/usecases/pocess-contacts/process-contacts.dto'

export class ProcessContactsUseCase implements UseCaseInterface<ProcessContactsInputDto, void> {
  constructor(
    private readonly associateContactsWithContactsBatch: AssociateContactWithContactBatchUseCase,
  ) {}

  execute = async (input: ProcessContactsInputDto): Promise<void> => {
    // await this.associateContactsWithContactsBatch.execute()
  }
}
