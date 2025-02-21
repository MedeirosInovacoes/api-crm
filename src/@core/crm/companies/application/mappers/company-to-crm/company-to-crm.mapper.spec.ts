import { CapitalizeText } from '@/@core/@shared/application/utils/formaters/captilize'
import { CompanyToCrmMapper } from '@/@core/crm/companies/application/mappers/company-to-crm/company-to-crm.mapper'
import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { format } from 'date-fns'

describe('CompanyToCrmMapper unit tests', () => {
  it('should return the correct values', () => {
    const company = CompanyFakeBuilder.aCompany().build()

    const mapper = CompanyToCrmMapper.toCrm(company)

    expect(mapper).toEqual({
      customer_code: company.customerCode.toString(),
      customer_primary_code: company.customerPrimaryCode.toString(),
      name: CapitalizeText.capitalize(company.name),
      cpf: company.cpf ?? null,
      cnpj: company.cnpj ?? null,
      client: CapitalizeText.capitalize(company.client),
      kind_person: company.kindPerson,
      active: expect.stringMatching(/^(N|S)$/),
      average_ticket_monthly: expect.any(String),
      average_term_monthly: expect.any(String),
      classification: company.classification,
      limit: expect.any(String),
      available_limit: expect.any(String),
      date_last_purchase: format(company.dateLastPurchase, 'yyyy-MM-dd'),
      winthor_registration_data: format(company.winthorRegistrationDate, 'yyyy-MM-dd'),
      state_registration: company.stateRegistration ?? null,
      origin_lead: 'Winthor',
      email_nfe: company.emailNfe?.trim() ?? null,
      blocked: expect.stringMatching(/^(N|S)$/),
      website: company.website ?? null,
      address: company.address ?? null,
      district: company.district ?? null,
      city: company.city ?? null,
      complement: company.complement ?? null,
      state: company.state ?? null,
      zip: company.zipCode ?? null,
      sales_code: company.salesCode?.toString() ?? null,
      billing_branch_code: company.billingBranchCode?.toString(),
      billing_branch_description: company.billingBranchDescription ?? null,
      network_code: company.networkCode?.toString() ?? null,
      network_description: company.networkDescription ?? null,
      activity_code: company.activityCode?.toString() ?? null,
      activity_description: company.activityDescription ?? null,
      channel_description: company.channelDescription ?? null,
      square_code: company.squareCode?.toString() ?? null,
      square_description: company.squareDescription ?? null,
    })
  })
})
