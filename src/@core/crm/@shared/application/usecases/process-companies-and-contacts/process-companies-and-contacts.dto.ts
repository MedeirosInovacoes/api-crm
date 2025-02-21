import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'

export type ContactsToAssociateWithCompaniesDto = {
  contactId: string
  companyId: string
}

export type ProcessCustomersInputDto = {
  customer: CustomerEntity
  companiesInCrm: {
    id: string
    cnpj: string
    cpf: string
    customerCode: number
    createdAt: Date
    updatedAt: Date
  }[]
}

export type ProcessCustomersOutputDto = {
  companyToUpdate?: CompanyEntity | null
  companyToCreate?: CompanyEntity | null
}
