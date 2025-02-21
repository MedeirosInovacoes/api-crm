import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { AssociateContactWithContactBatchUseCase } from '@/@core/crm/contacts/application/usecases/associate-contact-with-contact-batch/associate-contact-with-contact-batch.usecase'
import { AssociateContactsWithCompaniesBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.dto'
import { AssociateContactsWithCompaniesBatchUsecase } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.usecase'
import { CheckExistContactInputDto } from '@/@core/crm/contacts/application/usecases/check-exist-contact/check-exist-contact.dto'
import { CheckExistContactUseCase } from '@/@core/crm/contacts/application/usecases/check-exist-contact/check-exist-contact.usecase'
import { CreateContactsBatchUseCase } from '@/@core/crm/contacts/application/usecases/create-contacts-batch/create-contacts-batch.usecase'
import {
  FilterDuplicateContactsInputDto,
  FilterDuplicateContactsOutputDto,
} from '@/@core/crm/contacts/application/usecases/filter-duplicate-contacts/filter-duplicate-contacts.dto'
import { FilterDuplicateContactsUseCase } from '@/@core/crm/contacts/application/usecases/filter-duplicate-contacts/filter-duplicate-contacts.usecase'
import { FindAllContactsUseCase } from '@/@core/crm/contacts/application/usecases/find-all-contacts/find-all-contacts.usecase'
import { UpdateContactsBatchUseCase } from '@/@core/crm/contacts/application/usecases/update-contacts-batch/update-contacts-batch.usecase'
import { ContactFacadeInterface } from '@/@core/crm/contacts/application/facade/contact.facade.dto'

export class ContactFacade implements ContactFacadeInterface {
  constructor(
    private readonly createContactsBatchUseCase: CreateContactsBatchUseCase,
    private readonly updateContactsBatchUseCase: UpdateContactsBatchUseCase,
    private readonly findAllContactsUseCase: FindAllContactsUseCase,
    private readonly associateContactsWithContactsBatchUseCase: AssociateContactWithContactBatchUseCase,
    private readonly associateContactsWithCompaniesBatchUseCase: AssociateContactsWithCompaniesBatchUsecase,
    private readonly filterDuplicateContactsUseCase: FilterDuplicateContactsUseCase,
  ) {}

  filterDuplicates(input: FilterDuplicateContactsInputDto): FilterDuplicateContactsOutputDto {
    return this.filterDuplicateContactsUseCase.execute(input)
  }

  async associateContactsWithContactsBatch(): Promise<void> {
    return this.associateContactsWithContactsBatchUseCase.execute()
  }

  async associateContactsWithCompaniesBatch(
    input: AssociateContactsWithCompaniesBatchInputDto[],
  ): Promise<void> {
    return this.associateContactsWithCompaniesBatchUseCase.execute(input)
  }

  async findAll(): Promise<ContactEntity[]> {
    return this.findAllContactsUseCase.execute()
  }

  checkExistContact(input: CheckExistContactInputDto): { contactId: string | null } {
    return CheckExistContactUseCase.execute(input)
  }

  async createBatch(input: ContactEntity[]): Promise<void> {
    return this.createContactsBatchUseCase.execute(input)
  }

  async updateBatch(input: ContactEntity[]): Promise<void> {
    return this.updateContactsBatchUseCase.execute(input)
  }
}
