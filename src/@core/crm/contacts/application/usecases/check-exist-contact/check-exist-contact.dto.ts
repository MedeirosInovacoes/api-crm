import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'

export interface CheckExistContactInputDto {
  customerCode: number
  contactsInCrm: ContactEntity[]
}
