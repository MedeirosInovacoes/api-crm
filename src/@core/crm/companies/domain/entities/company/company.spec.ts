import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import {
  CompanyEntityProps,
  CompanyEntity,
} from '@/@core/crm/companies/domain/entities/company/company.entity'
import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'
import { addDays } from 'date-fns'

const mockCompanyProperties: CompanyEntityProps = CompanyFakeBuilder.aCompany().build()
describe('constructor of company', () => {
  it('should create a company', () => {
    const company = new CompanyEntity(mockCompanyProperties)

    expect(company.toJson()).toMatchObject({
      id: null,
      ...mockCompanyProperties,
    })
  })

  it('should correctly return the values ​​to be sent to the crm', () => {
    const fakerDealOne = DealFakeBuilder.aDeal().withAmount(300).withBillingDate(new Date()).build()
    const fakerDealTwo = DealFakeBuilder.aDeal()
      .withAmount(100)
      .withBillingDate(addDays(new Date(), 5))
      .build()

    const faker = CompanyFakeBuilder.aCompany()
      .withId('123')
      .withActive('S')
      .withWebsite('teste.com')
      .withState('SP')
      .withStateRegistration('123')
      .withSquareDescription('test')
      .withSquareCode(123)
      .withOriginLead('test')
      .withNetworkDescription('test')
      .withNetworkCode(123)
      .withSalesCode(123)
      .withName('test')
      .withLimit(123)
      .withKindPerson('test')
      .withDeals([fakerDealOne, fakerDealTwo])
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .withZipCode('123')
      .withWinthorRegistrationDate(new Date())
      .withCustomerCode(123)
      .withCustomerPrimaryCode(123)
      .withCpf('123')
      .withCnpj('123')
      .withClient('test')
      .withClassification('test')
      .withAvailableLimit(123)
      .withDateLastPurchase(new Date())
      .withEmailNfe('test')
      .withDistrict('test')
      .withComplement('test')
      .withCity('test')
      .withAddress('test')
      .withAverageTicketMonthly(123)
      .withAverageTermMonthly(123)
      .withBillingBranchCode(123)
      .withBillingBranchDescription('test')
      .withActivityDescription('test')
      .withActivityCode(123)
      .withBlocked(true)
      .withChannelDescription('test')
      .build()

    const received = faker.toCreateCrm()

    expect(received).toStrictEqual({
      active: 'S',
      channel_description: 'test',
      activity_code: '123',
      activity_description: 'test',
      address: 'test',
      available_limit: '123',
      average_term_monthly: '5',
      average_ticket_monthly: '200.00',
      billing_branch_code: '123',
      billing_branch_description: 'test',
      blocked: 'S',
      city: 'test',
      classification: 'test',
      client: 'Test',
      cnpj: '123',
      complement: 'test',
      cpf: '123',
      customer_code: '123',
      customer_primary_code: '123',
      date_last_purchase: expect.any(String),
      district: 'test',
      email_nfe: 'test',
      kind_person: 'test',
      limit: '123',
      name: 'Test',
      network_code: '123',
      network_description: 'test',
      origin_lead: 'Winthor',
      sales_code: '123',
      square_code: '123',
      square_description: 'test',
      state: 'SP',
      state_registration: '123',
      website: 'teste.com',
      winthor_registration_data: expect.any(String),
      zip: '123',
    })
  })
})
