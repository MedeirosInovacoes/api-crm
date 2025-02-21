import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import {
  CompanyToDomainMapperInput,
  CompanyToDomainMapperOutput,
} from '@/@core/crm/companies/infra/hubspot/mappers/company/company-to-domain.dto'

export class CompanyToDomainMapper {
  static map(input: CompanyToDomainMapperInput): CompanyToDomainMapperOutput {
    return new CompanyEntity(
      {
        active: input.properties.active,
        activityCode: input.properties?.activity_code && +input.properties.activity_code,
        activityDescription: input.properties.activity_description,
        address: input.properties.address,
        availableLimit: input.properties.available_limit && +input.properties.available_limit,
        averageTermMonthly:
          input.properties.average_term_monthly && +input.properties.average_term_monthly,
        averageTicketMonthly:
          input.properties.average_ticket_monthly && +input.properties.average_ticket_monthly,
        billingBranchCode:
          input.properties.billing_branch_code && +input.properties.billing_branch_code,
        billingBranchDescription: input.properties.billing_branch_description,
        blocked: input.properties.blocked
          ? input.properties.blocked === 'Sim'
            ? true
            : false
          : undefined,
        city: input.properties.city,
        classification: input.properties.classification,
        client: input.properties.client,
        cnpj: input.properties.cnpj,
        complement: input.properties.complement,
        cpf: input.properties.cpf,
        customerCode: input.properties.customer_code && +input.properties.customer_code,
        customerPrimaryCode:
          input.properties.customer_primary_code && +input.properties.customer_primary_code,
        dateLastPurchase:
          input.properties.date_last_purchase && new Date(input.properties.date_last_purchase),
        district: input.properties.district,
        emailNfe: input.properties.email_nfe,
        kindPerson: input.properties.kind_person,
        limit: input.properties.limit && +input.properties.limit,
        name: input.properties.name,
        salesCode: input.properties.sales_code && +input.properties.sales_code,
        networkCode: input.properties.network_code && +input.properties.network_code,
        networkDescription: input.properties.network_description,
        originLead: input.properties.origin_lead,
        squareCode: input.properties.square_code && +input.properties.square_code,
        squareDescription: input.properties.square_description,
        channelDescription: input.properties.channel_description,
        state: input.properties.state,
        stateRegistration: input.properties.state_registration,
        website: input.properties.website,
        winthorRegistrationDate:
          input.properties.winthor_registration_date &&
          new Date(input.properties.winthor_registration_date),
        zipCode: input.properties.zip,
        originalSource: input.properties.hs_analytics_source,
        originalInDepthSource1: input.properties.hs_analytics_source_data_1,
        originalInDepthSource2: input.properties.hs_analytics_source_data_2,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
      },
      input.id ?? null,
    )
  }
}
