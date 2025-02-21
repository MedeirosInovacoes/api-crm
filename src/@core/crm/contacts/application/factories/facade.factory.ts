import { ContactRepository } from '@/@core/crm/contacts/infra/repository/contact.repository'
import { AssociateContactWithContactBatchUseCase } from '@/@core/crm/contacts/application/usecases/associate-contact-with-contact-batch/associate-contact-with-contact-batch.usecase'
import { AssociateContactsWithCompaniesBatchUsecase } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.usecase'
import { CreateContactsBatchUseCase } from '@/@core/crm/contacts/application/usecases/create-contacts-batch/create-contacts-batch.usecase'
import { FilterDuplicateContactsUseCase } from '@/@core/crm/contacts/application/usecases/filter-duplicate-contacts/filter-duplicate-contacts.usecase'
import { FindAllContactsUseCase } from '@/@core/crm/contacts/application/usecases/find-all-contacts/find-all-contacts.usecase'
import { UpdateContactsBatchUseCase } from '@/@core/crm/contacts/application/usecases/update-contacts-batch/update-contacts-batch.usecase'
import { CrmRepository } from '@/@core/crm/@shared/infra/repository/crm.repository'
import { ContactFacade } from '@/@core/crm/contacts/application/facade/contact.facade'

export class ContactFacadeFactory {
  static create(): ContactFacade {
    const crmRepository = new CrmRepository()
    const contactRepository = new ContactRepository(crmRepository)
    const createContactsBatchUseCase = new CreateContactsBatchUseCase(contactRepository)
    const updateContactsBatchUseCase = new UpdateContactsBatchUseCase(contactRepository)
    const findAllContactsUseCase = new FindAllContactsUseCase(contactRepository)
    const associateContactsWithContactsUseCase = new AssociateContactWithContactBatchUseCase(
      contactRepository,
    )
    const associateContactsWithCompaniesUseCase = new AssociateContactsWithCompaniesBatchUsecase(
      contactRepository,
    )
    const filterDuplicateContactsUseCase = new FilterDuplicateContactsUseCase()

    return new ContactFacade(
      createContactsBatchUseCase,
      updateContactsBatchUseCase,
      findAllContactsUseCase,
      associateContactsWithContactsUseCase,
      associateContactsWithCompaniesUseCase,
      filterDuplicateContactsUseCase,
    )
  }
}
