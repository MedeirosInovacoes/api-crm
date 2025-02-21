import {
  AssociationCrmObjectWithFromDto,
  CreateCrmObjectDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { PublicAssociationMultiPost } from '@hubspot/api-client/lib/codegen/crm/associations/v4'
import {
  AssociationSpecAssociationCategoryEnum,
  SimplePublicObjectBatchInput,
  SimplePublicObjectInputForCreate,
} from '@hubspot/api-client/lib/codegen/crm/companies'

export class CrmMapper {
  static toCreate<T>(input: CreateCrmObjectDto<T>): SimplePublicObjectInputForCreate {
    return {
      properties: { ...input.data } as { [key: string]: string },
      associations:
        input.associations?.map((association) => ({
          to: { id: association.to.id },
          types: association.types.map((type) => ({
            associationCategory: type.category as unknown as AssociationSpecAssociationCategoryEnum,
            associationTypeId: type.typeId,
          })),
        })) ?? [],
    }
  }

  static toUpdate<T>(input: UpdateCrmObjectDto<T>): SimplePublicObjectBatchInput {
    return {
      id: input.id,
      properties: { ...input.data } as { [key: string]: string },
    }
  }

  static toAssociationWithFrom(input: AssociationCrmObjectWithFromDto): PublicAssociationMultiPost {
    return {
      to: { id: input.to.id },
      _from: { id: input.from.id },
      types: input.types.map((type) => ({
        associationCategory: type.category as unknown as AssociationSpecAssociationCategoryEnum,
        associationTypeId: type.typeId,
      })),
    }
  }
}
