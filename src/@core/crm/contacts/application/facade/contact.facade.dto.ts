import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { AssociateContactsWithCompaniesBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.dto'
import { CheckExistContactInputDto } from '@/@core/crm/contacts/application/usecases/check-exist-contact/check-exist-contact.dto'
import {
  FilterDuplicateContactsInputDto,
  FilterDuplicateContactsOutputDto,
} from '@/@core/crm/contacts/application/usecases/filter-duplicate-contacts/filter-duplicate-contacts.dto'

export type ContactFacadeInterface = {
  createBatch(input: ContactEntity[]): Promise<void>
  updateBatch(input: ContactEntity[]): Promise<void>
  checkExistContact(input: CheckExistContactInputDto): { contactId: string | null }
  findAll(): Promise<ContactEntity[]>
  associateContactsWithContactsBatch(): Promise<void>
  associateContactsWithCompaniesBatch(
    input: AssociateContactsWithCompaniesBatchInputDto[],
  ): Promise<void>
  filterDuplicates(input: FilterDuplicateContactsInputDto): FilterDuplicateContactsOutputDto
}
