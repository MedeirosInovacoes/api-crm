import { CrmFilterInputOperatorEnum } from '@/@core/crm/@shared/application/enum/filter-input.enum'

export type CrmFilterInput = {
  filterGroups: {
    filters: {
      propertyName: string
      operator: CrmFilterInputOperatorEnum
      value?: string
    }[]
  }[]
  properties?: string[]
  sorts?: string[]
}
