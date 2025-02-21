import { ContactFacade } from '@/@core/crm/contacts/application/facade/contact.facade'
import { ContactFacadeFactory } from '@/@core/crm/contacts/application/factories/facade.factory'

const contactFacadeProvider = {
  provide: 'ContactFacade',
  useExisting: ContactFacade,
}

const contactFacadeFactoryProvider = {
  provide: ContactFacade,
  useFactory: () => ContactFacadeFactory.create(),
}

export const CONTACTS_REPOSITORY_PROVIDERS = {
  CONTACT_FACADE: contactFacadeProvider,
  CONTACT_FACADE_FACTORY: contactFacadeFactoryProvider,
}
