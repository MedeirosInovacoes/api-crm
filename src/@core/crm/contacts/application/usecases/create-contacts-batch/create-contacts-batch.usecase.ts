import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import {
  AssociationCrmObjectDto,
  CreateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'

export class CreateContactsBatchUseCase implements UseCaseInterface<ContactEntity[], void> {
  constructor(private readonly contactRepository: ContactGateway) {}

  execute = async (input: ContactEntity[]): Promise<void> => {
    let data: CreateCrmObjectDto<ContactEntity>[] = []

    for (const [index, contact] of input.entries()) {
      const associations: AssociationCrmObjectDto[] = [
        {
          to: { id: contact.companyId },
          types: [
            {
              category: AssociationTypeEnum.CRM_DEFINED,
              typeId: 1,
            },
          ],
        },
      ]

      data.push({
        data: contact,
        associations,
      })

      if (data.length === 100 || input.length === index + 1) {
        await this.contactRepository.createBatch(data)
        data = []
      }
    }
  }
}
