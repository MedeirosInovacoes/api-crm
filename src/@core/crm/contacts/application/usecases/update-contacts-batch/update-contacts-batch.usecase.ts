import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import { UpdateCrmObjectDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'
import { UpdateContactsBatchInputDto } from '@/@core/crm/contacts/application/usecases/update-contacts-batch/update-contacts-batch.dto'

export class UpdateContactsBatchUseCase
  implements UseCaseInterface<UpdateContactsBatchInputDto, void>
{
  constructor(private readonly contactRepository: ContactGateway) {}

  execute = async (input: UpdateContactsBatchInputDto): Promise<void> => {
    let data: UpdateCrmObjectDto<ContactEntity>[] = []

    for (const [index, contact] of input.entries()) {
      data.push({
        id: contact.id,
        data: contact,
      })

      if (data.length === 100 || input.length === index + 1) {
        await this.contactRepository.updateBatch(data)
        data = []
      }
    }
  }
}
