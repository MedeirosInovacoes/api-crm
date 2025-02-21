import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'

export type AssociationCrmObjectDto = {
  types: { category: AssociationTypeEnum; typeId: number }[]
  to: { id: string }
}

export type AssociationCrmObjectWithFromDto = {
  types: { category: AssociationTypeEnum; typeId: number }[]
  to: { id: string }
  from: { id: string }
}

export type CreateCrmObjectDto<T> = {
  data: T
  associations?: AssociationCrmObjectWithFromDto[] | AssociationCrmObjectDto[]
}

export type UpdateCrmObjectDto<T> = {
  id: string
  data: T
  associations?: (AssociationCrmObjectWithFromDto | AssociationCrmObjectDto)[]
}
