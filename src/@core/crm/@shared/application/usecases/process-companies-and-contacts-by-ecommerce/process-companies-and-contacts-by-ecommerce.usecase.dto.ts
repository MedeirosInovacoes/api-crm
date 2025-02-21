import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { ContactFacade } from '@/@core/crm/contacts/application/facade/contact.facade'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'

export type ProcessCompaniesAndContactsByEcommerceDependencies = {
  companyFacade: CompanyFacade
  customerFacade: CustomerFacade
  contactFacade: ContactFacade
}
