import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'

export type CompanyToCrmMapperOutputDto = {
  customer_code: string
  customer_primary_code: string
  name: string
  cpf: string
  cnpj: string
  client: string
  kind_person: string
  active: string
  average_ticket_monthly: string
  average_term_monthly: string
  classification: string
  limit: string
  available_limit: string
  date_last_purchase: string
  winthor_registration_data: string
  state_registration: string
  origin_lead: string
  email_nfe: string
  blocked: string
  website: string
  address: string
  district: string
  city: string
  complement: string
  state: string
  zip: string
  sales_code: string
  billing_branch_code: string
  billing_branch_description: string
  network_code: string
  network_description: string
  activity_code: string
  activity_description: string
  channel_description: string
  square_code: string
  square_description: string
}

export type CompanyToCrmMapperInput = CompanyEntity
