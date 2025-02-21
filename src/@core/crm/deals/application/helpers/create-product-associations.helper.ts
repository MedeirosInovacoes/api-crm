import { AssociationCrmObjectWithFromDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'

export class CreateProductAssociationHelper {
  static execute = (
    input: CreateProductAssociationHelperInputDto,
  ): CreateProductAssociationHelperOutputDto => {
    const associations: AssociationCrmObjectWithFromDto[] = []

    input.productsIds.forEach((product) => {
      associations.push({
        from: { id: input.dealId },
        to: { id: product },
        types: [
          {
            category: AssociationTypeEnum.CRM_DEFINED,
            typeId: 630,
          },
        ],
      })
    })

    return associations
  }
}

export type CreateProductAssociationHelperInputDto = {
  dealId: string
  productsIds: string[]
}

export type CreateProductAssociationHelperOutputDto = AssociationCrmObjectWithFromDto[]
