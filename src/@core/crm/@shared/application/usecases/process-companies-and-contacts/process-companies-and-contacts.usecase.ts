import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import {
  ContactsToAssociateWithCompaniesDto,
  ProcessCustomersInputDto,
  ProcessCustomersOutputDto,
} from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts/process-companies-and-contacts.dto'
import { ContactFacade } from '@/@core/crm/contacts/application/facade/contact.facade'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { CrmFilterInputOperatorEnum } from '@/@core/crm/@shared/application/enum/filter-input.enum'
import { SplitArrayIntoChunksUtil } from '@/@core/@shared/application/utils/split-array-into-chucks/split-array-into-chucks.util'

export class ProcessCompaniesAndContactsUseCase {
  constructor(
    private readonly companyFacade: CompanyFacade,
    private readonly customerFacade: CustomerFacade,
    private readonly contactFacade: ContactFacade,
  ) {}

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

      const companiesCreated = await this.companyFacade.createBatch(companiesToCreate)

      for (const company of companiesCreated) {
        const customer = customers.find(
          (customer) => customer.customerCode === company.customerCode,
        )

        const { contactId } = this.contactFacade.checkExistContact({
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
        const result = this.contactFacade.filterDuplicates({
          contactsInCrm,
          newContacts: contactsToCreate,
        })

        if (result.isRight()) {
          await this.contactFacade.createBatch(result.value)
        }
      }

      if (contactsToAssociateWithCompanies.length) {
        await this.contactFacade.associateContactsWithCompaniesBatch(
          contactsToAssociateWithCompanies,
        )
      }
    }

    if (companiesToUpdate.length) {
      const contactsToCreate: ContactEntity[] = []
      const contactsToUpdate: ContactEntity[] = []

      await this.companyFacade.updateBatch(companiesToUpdate)

      for (const company of companiesToUpdate) {
        const customer = customers.find(
          (customer) => customer.customerCode === company.customerCode,
        )

        const { contactId } = this.contactFacade.checkExistContact({
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
        const result = this.contactFacade.filterDuplicates({
          contactsInCrm,
          newContacts: contactsToCreate,
        })

        if (result.isRight()) {
          await this.contactFacade.createBatch(result.value)
        }
      }

      if (contactsToUpdate.length) {
        const result = this.contactFacade.filterDuplicates({
          contactsInCrm,
          newContacts: contactsToUpdate,
        })

        if (result.isRight()) {
          await this.contactFacade.updateBatch(result.value)
        }
      }
    }

    await this.contactFacade.associateContactsWithContactsBatch()
    await this.companyFacade.associateChildCompaniesWithParent()
  }

  private fetchData = async () => {
    const customers = await this.customerFacade.findAll()

    if (!customers.length) {
      return { customers: [], companiesInCrm: [], contactsInCrm: [] }
    }

    const [customersLeadsRetrieval, companiesInCrm, contactsInCrm] = await Promise.all([
      this.customerFacade.findAllLeadsRetrieval(),
      this.companyFacade.findAll({
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
              ],
            },
          ],
        },
      }),
      this.contactFacade.findAll(),
    ])

    customersLeadsRetrieval.forEach((customer) => {
      const customerExist = customers.find(
        (customerInList) => customerInList.customerCode === customer.customerCode,
      )

      if (!customerExist) {
        customers.push(customer)
      }
    })

    const customersNotExists = companiesInCrm
      .filter((company) => {
        return !customers.find((customer) => customer.customerCode === company.customerCode)
      })
      .map((customer) => ({ customerCode: customer.customerCode }))

    if (customersNotExists.length) {
      const customersCode = customersNotExists.map((customer) => customer.customerCode)

      const customersCodeChuncks = SplitArrayIntoChunksUtil.execute(customersCode, 1000)

      const customersNotExistsResponse = []

      for (const customersCode of customersCodeChuncks) {
        const customers = await this.customerFacade.findAll({ customersCode })

        customersNotExistsResponse.push(...customers)
      }

      customersNotExistsResponse.forEach((customer) => {
        const customerExists = customers.find(
          (customerInList) => customerInList.customerCode === customer.customerCode,
        )

        if (!customerExists) {
          customers.push(customer)
        }
      })
    }

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
