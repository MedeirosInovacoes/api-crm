import { ProcessCompaniesAndContactsByEcommerceUseCase } from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts-by-ecommerce/process-companies-and-contacts-by-ecommerce.usecase'
import { ProcessCompaniesAndContactsUseCase } from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts/process-companies-and-contacts.usecase'
import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import CreateBatchCompaniesUseCase from '@/@core/crm/companies/application/usecase/create-batch-companies/create-batch-companies.usecase'
import { FindAllCompaniesUseCase } from '@/@core/crm/companies/application/usecase/find-all-companies/find-all-companies.usecase'
import { FindAllOriginCustomersCompaniesUseCase } from '@/@core/crm/companies/application/usecase/find-all-origin-customers-companies/find-all-origin-customers-companies.usecase'
import { UpdateBatchCompaniesUseCase } from '@/@core/crm/companies/application/usecase/update-batch-companies/update-batch-companies.usecase'
import { CompanyGateway } from '@/@core/crm/companies/domain/gateway/company/company.gateway'
import { ContactFacade } from '@/@core/crm/contacts/application/facade/contact.facade'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { COMPANIES_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.facade.provider'
import { COMPANIES_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.repository.provider'
import { CONTACTS_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/contacts/contacts.repository'
import { CUSTOMERS_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.facade.provider'
import { Provider, Scope } from '@nestjs/common'

const processCompaniesAndContactsByEcommerceUseCaseProvider: Provider = {
  provide: ProcessCompaniesAndContactsByEcommerceUseCase,
  useFactory: (
    companyFacade: CompanyFacade,
    customerFacade: CustomerFacade,
    contactFacade: ContactFacade,
  ) => {
    return new ProcessCompaniesAndContactsByEcommerceUseCase({
      companyFacade,
      customerFacade,
      contactFacade,
    })
  },
  inject: [
    COMPANIES_FACADE_PROVIDERS.COMPANY_FACADE.provide,
    CUSTOMERS_FACADE_PROVIDERS.CUSTOMER_FACADE.provide,
    CONTACTS_REPOSITORY_PROVIDERS.CONTACT_FACADE_FACTORY.provide,
  ],
}

const createBatchCompaniesUseCaseProvider = {
  provide: CreateBatchCompaniesUseCase,
  useFactory: (companyRepository: CompanyGateway) =>
    new CreateBatchCompaniesUseCase({ companyRepository }),
  inject: [COMPANIES_REPOSITORY_PROVIDERS.COMPANY_HUBSPOT_REPOSITORY.provide],
}

const updateBatchCompaniesUseCaseProvider = {
  provide: UpdateBatchCompaniesUseCase,
  useFactory: (companyRepository: CompanyGateway) =>
    new UpdateBatchCompaniesUseCase({ companyRepository }),
  inject: [COMPANIES_REPOSITORY_PROVIDERS.COMPANY_HUBSPOT_REPOSITORY.provide],
  scope: Scope.REQUEST,
}

const findAllCompaniesUseCaseProvider = {
  provide: FindAllCompaniesUseCase,
  useFactory: (companyRepository: CompanyGateway) =>
    new FindAllCompaniesUseCase({ companyRepository }),
  inject: [COMPANIES_REPOSITORY_PROVIDERS.COMPANY_HUBSPOT_REPOSITORY.provide],
}

const processCompaniesAndContactsUseCaseProvider = {
  provide: ProcessCompaniesAndContactsUseCase,
  useFactory: (
    companyFacade: CompanyFacade,
    customerFacade: CustomerFacade,
    contactFacade: ContactFacade,
  ) => {
    return new ProcessCompaniesAndContactsUseCase(companyFacade, customerFacade, contactFacade)
  },
  inject: [
    COMPANIES_FACADE_PROVIDERS.COMPANY_FACADE.provide,
    CUSTOMERS_FACADE_PROVIDERS.CUSTOMER_FACADE.provide,
    CONTACTS_REPOSITORY_PROVIDERS.CONTACT_FACADE_FACTORY.provide,
  ],
}

const findAllOriginCustomersCompaniesUseCase = {
  provide: FindAllOriginCustomersCompaniesUseCase,
  useFactory: (companyRepository: CompanyGateway) => {
    return new FindAllOriginCustomersCompaniesUseCase({ companyRepository })
  },
  inject: [COMPANIES_REPOSITORY_PROVIDERS.COMPANY_REPOSITORY.provide],
}
export const COMPANIES_USECASE_PROVIDERS = {
  CREATE_BATCH_COMPANIES_USE_CASE: createBatchCompaniesUseCaseProvider,
  UPDATE_BATCH_COMPANIES_USE_CASE: updateBatchCompaniesUseCaseProvider,
  FIND_ALL_COMPANIES_USE_CASE: findAllCompaniesUseCaseProvider,
  PROCESS_COMPANIES_AND_CONTACTS: processCompaniesAndContactsUseCaseProvider,
  PROCESS_COMPANIES_AND_CONTACTS_BY_ECOMMERCE:
    processCompaniesAndContactsByEcommerceUseCaseProvider,
  FIND_ALL_ORIGIN_CUSTOMERS_USECASE: findAllOriginCustomersCompaniesUseCase,
}
