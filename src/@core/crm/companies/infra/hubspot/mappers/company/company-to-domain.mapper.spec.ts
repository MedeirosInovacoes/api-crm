import { CompanyToDomainMapperInput } from '@/@core/crm/companies/infra/hubspot/mappers/company/company-to-domain.dto'
import { CompanyToDomainMapper } from '@/@core/crm/companies/infra/hubspot/mappers/company/company-to-domain.repository.mapper'

describe('CompanyToDomainMapper unit tests', () => {
  it('should return the correct values', () => {
    const company: CompanyToDomainMapperInput = {
      id: '132132323',
      properties: {
        client: 'teste',
        customer_primary_code: '123123',
        customer_code: '31232',
        cpf: '321223222',
        cnpj: '2154123223',
        origin_lead: 'origin_lead',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const mapper = CompanyToDomainMapper.map(company)

    expect(mapper['_props']).toStrictEqual({
      client: company.properties.client,
      customerPrimaryCode: +company.properties.customer_primary_code,
      customerCode: +company.properties.customer_code,
      cpf: company.properties.cpf,
      cnpj: company.properties.cnpj,
      originLead: company.properties.origin_lead,
      active: undefined,
      activityCode: undefined,
      activityDescription: undefined,
      originalInDepthSource1: undefined,
      originalInDepthSource2: undefined,
      originalSource: undefined,
      address: undefined,
      availableLimit: undefined,
      averageTermMonthly: undefined,
      averageTicketMonthly: undefined,
      billingBranchCode: undefined,
      billingBranchDescription: undefined,
      blocked: undefined,
      city: undefined,
      classification: undefined,
      complement: undefined,
      dateLastPurchase: undefined,
      district: undefined,
      emailNfe: undefined,
      kindPerson: undefined,
      limit: undefined,
      name: undefined,
      salesCode: undefined,
      networkCode: undefined,
      networkDescription: undefined,
      squareCode: undefined,
      squareDescription: undefined,
      channelDescription: undefined,
      state: undefined,
      stateRegistration: undefined,
      website: undefined,
      winthorRegistrationDate: undefined,
      zipCode: undefined,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
