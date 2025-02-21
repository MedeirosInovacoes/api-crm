import { CrmFilterInputOperatorEnum } from '@/@core/crm/@shared/application/enum/filter-input.enum'
import { ProcessCompaniesAndContactsByEcommerceDependencies } from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts-by-ecommerce/process-companies-and-contacts-by-ecommerce.usecase.dto'
import {
  ContactsToAssociateWithCompaniesDto,
  ProcessCustomersInputDto,
  ProcessCustomersOutputDto,
} from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts/process-companies-and-contacts.dto'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'

export class ProcessCompaniesAndContactsByEcommerceUseCase {
  constructor(private dependencies: ProcessCompaniesAndContactsByEcommerceDependencies) {}

  execute = async (): Promise<void> => {
    const contactsToAssociateWithCompanies: ContactsToAssociateWithCompaniesDto[] = []
    const companiesToUpdate: CompanyEntity[] = []
    const companiesToCreate: CompanyEntity[] = []

    const { companiesInCrm, contactsInCrm, customers } = await this.fetchData()

    for (const customer of customers) {
      const { companyToCreate, companyToUpdate } = this.processCustomers({
        customer,
        companiesInCrm: companiesInCrm.map((company) => ({
          id: company.id,
          cnpj: company.cnpj,
          cpf: company.cpf,
          customerCode: company.customerCode,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
        })),
      })

      if (companyToCreate) {
        companiesToCreate.push(companyToCreate)
      } else {
        companiesToUpdate.push(companyToUpdate)
      }
    }

    if (companiesToCreate.length) {
      const contactsToCreate: ContactEntity[] = []

      const companiesCreated = await this.dependencies.companyFacade.createBatch(companiesToCreate)

      for (const company of companiesCreated) {
        const customer = customers.find(
          (customer) => customer.customerCode === company.customerCode,
        )

        const { contactId } = this.dependencies.contactFacade.checkExistContact({
          customerCode: customer.customerCode,
          contactsInCrm,
        })

        const contact = new ContactEntity(
          {
            email: customer.email,
            name: customer.client,
            phone: customer.phone,
            customerCode: customer.customerCode,
            customerPrimaryCode: customer.customerPrimaryCode,
            companyId: company.id,
          },
          contactId,
        )

        if (!contactId) {
          contactsToCreate.push(contact)
        } else {
          contactsToAssociateWithCompanies.push({ contactId: contact.id, companyId: company.id })
        }
      }

      if (contactsToCreate.length) {
        const result = this.dependencies.contactFacade.filterDuplicates({
          contactsInCrm,
          newContacts: contactsToCreate,
        })

        if (result.isRight()) {
          await this.dependencies.contactFacade.createBatch(result.value)
        }
      }

      if (contactsToAssociateWithCompanies.length) {
        await this.dependencies.contactFacade.associateContactsWithCompaniesBatch(
          contactsToAssociateWithCompanies,
        )
      }
    }

    if (companiesToUpdate.length) {
      const contactsToCreate: ContactEntity[] = []
      const contactsToUpdate: ContactEntity[] = []

      await this.dependencies.companyFacade.updateBatch(companiesToUpdate)

      for (const company of companiesToUpdate) {
        const customer = customers.find(
          (customer) => customer.customerCode === company.customerCode,
        )

        const { contactId } = this.dependencies.contactFacade.checkExistContact({
          customerCode: customer.customerCode,
          contactsInCrm,
        })

        const contact = new ContactEntity(
          {
            email: customer.email,
            name: customer.client,
            phone: customer.phone,
            customerCode: customer.customerCode,
            customerPrimaryCode: customer.customerPrimaryCode,
            companyId: company.id,
          },
          contactId,
        )

        if (!contactId) {
          contactsToCreate.push(contact)
        } else {
          contactsToUpdate.push(contact)
        }
      }

      if (contactsToCreate.length) {
        const result = this.dependencies.contactFacade.filterDuplicates({
          contactsInCrm,
          newContacts: contactsToCreate,
        })

        if (result.isRight()) {
          await this.dependencies.contactFacade.createBatch(result.value)
        }
      }

      if (contactsToUpdate.length) {
        const result = this.dependencies.contactFacade.filterDuplicates({
          contactsInCrm,
          newContacts: contactsToUpdate,
        })

        if (result.isRight()) {
          await this.dependencies.contactFacade.updateBatch(result.value)
        }
      }
    }

    await this.dependencies.contactFacade.associateContactsWithContactsBatch()
    await this.dependencies.companyFacade.associateChildCompaniesWithParent()
  }

  private fetchData = async () => {
    const customers = await this.dependencies.customerFacade.findAll({
      orgin: 'Ecommerce',
    })

    if (!customers.length) {
      return { customers: [], companiesInCrm: [], contactsInCrm: [] }
    }

    const [companiesInCrm, contactsInCrm] = await Promise.all([
      this.dependencies.companyFacade.findAll({
        filters: {
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'customer_code',
                  operator: CrmFilterInputOperatorEnum.HasProperty,
                },
                {
                  propertyName: 'customer_primary_code',
                  operator: CrmFilterInputOperatorEnum.HasProperty,
                },
                {
                  propertyName: 'origin_lead',
                  operator: CrmFilterInputOperatorEnum.Eq,
                  value: 'Ecommerce',
                },
              ],
            },
          ],
        },
      }),
      this.dependencies.contactFacade.findAll(),
    ])

    return { customers, companiesInCrm, contactsInCrm }
  }

  private processCustomers = (input: ProcessCustomersInputDto): ProcessCustomersOutputDto => {
    const company = input.companiesInCrm.find((company) => {
      return company.customerCode && company.customerCode === input.customer.customerCode
    })

    const companyMapper = CompanyEntity.createWithCustomer(input.customer, company?.id)

    if (company) {
      return {
        companyToUpdate: companyMapper,
        companyToCreate: null,
      }
    }

    return {
      companyToUpdate: null,
      companyToCreate: companyMapper,
    }
  }
}
