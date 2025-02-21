import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactToCrmMapperOutputDto } from '@/@core/crm/contacts/application/mappers/contact-to-crm/contact-to-crm.dto'
import { CapitalizeText } from '@/@core/@shared/application/utils/formaters/captilize'

export class ContactToCrmMapper {
  static toCrm(input: ContactEntity): ContactToCrmMapperOutputDto {
    return {
      customer_code: input.customerCode,
      customer_primary_code: input.customerPrimaryCode,
      email: input.email,
      firstname: CapitalizeText.capitalize(input?.name),
      invalid_email: input.invalidEmail,
      phone: input.phone,
      associated_email: input.associatedEmail,
    }
  }
}
