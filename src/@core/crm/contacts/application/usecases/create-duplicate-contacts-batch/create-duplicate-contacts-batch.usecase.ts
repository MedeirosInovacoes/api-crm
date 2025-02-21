import UseCaseInterface from '@/@core/@shared/application/usecase/usecase.interface'
import { env } from '@/@core/@shared/infra/env'
import {
  AssociationCrmObjectDto,
  CreateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'

export class CreateDuplicateContactsBatchUseCase
  implements UseCaseInterface<ContactEntity[], void>
{
  constructor(private readonly contactRepository: ContactGateway) {}

  async execute(input: ContactEntity[]): Promise<void> {
    let inputs: CreateCrmObjectDto<ContactEntity>[] = []

    for (const [index, contact] of input.entries()) {
      const associations: AssociationCrmObjectDto[] = [
        {
          to: { id: contact.companyId },
          types: [{ category: AssociationTypeEnum.CRM_DEFINED, typeId: 1 }],
        },
        {
          to: { id: contact.id },
          types: [
            {
              category: AssociationTypeEnum.USER_DEFINED,
              typeId: env.NODE_ENV === 'production' ? 1 : 74,
            },
          ],
        },
      ]

      inputs.push({
        data: contact,
        associations,
      })
      if (inputs.length === 100 || input.length === index + 1) {
        await this.contactRepository.createBatch(inputs)
        inputs = []
      }
    }
  }
}
