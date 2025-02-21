import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CompanyToCrmMapperOutputDto } from '@/@core/crm/companies/application/mappers/company-to-crm/company-to-crm.dto'
import { differenceInDays, subDays, format, startOfMonth } from 'date-fns'
import { CapitalizeText } from '@/@core/@shared/application/utils/formaters/captilize'

export class CompanyToCrmMapper {
  static toCrm(company: CompanyEntity): CompanyToCrmMapperOutputDto {
    const firstDayOfMonth = startOfMonth(new Date())
    const dates: Date[] = []
    let averageDays = 0
    let ordersCount = 0
    let ordersTotalValues = 0

    company.deals.forEach((order) => {
      if (order.date >= firstDayOfMonth) {
        ordersCount++
        ordersTotalValues += +order.amount
        dates.push(order.billingDate)
      }
    })

    if (dates.length > 0) {
      dates.sort((a, b) => a.getTime() - b.getTime())

      let sumDaysBetweenOrders = 0

      for (let i = 1; i < dates.length; i++) {
        const previousOrderDate = new Date(dates[i - 1])
        const currentOrderDate = new Date(dates[i])
        sumDaysBetweenOrders += differenceInDays(currentOrderDate, previousOrderDate)
      }

      if (dates.length > 2) averageDays = sumDaysBetweenOrders / dates.length
      else averageDays = sumDaysBetweenOrders
    }

    return {
      customer_code: company.customerCode.toString(),
      customer_primary_code: company.customerPrimaryCode.toString(),
      name: company?.name
        ? CapitalizeText.capitalize(company.name)
        : CapitalizeText.capitalize(company.client),
      cpf: company.cpf ?? null,
      cnpj: company.cnpj ?? null,
      client: company.client && CapitalizeText.capitalize(company.client),
      kind_person: company.kindPerson,
      active: company.dateLastPurchase <= subDays(new Date(), 90) ? 'N' : 'S',
      average_ticket_monthly:
        parseFloat((ordersCount > 0 ? ordersTotalValues / ordersCount : 0).toString()).toFixed(2) ??
        '0',
      average_term_monthly: (+averageDays.toFixed(0)).toString() ?? '0',
      classification: company.classification,
      limit: company.limit.toFixed(0).toString() ?? '0',
      available_limit: company.availableLimit.toFixed(0).toString() ?? '0',
      date_last_purchase:
        company.dateLastPurchase && format(company.dateLastPurchase, 'yyyy-MM-dd'),
      winthor_registration_data:
        company.winthorRegistrationDate && format(company.winthorRegistrationDate, 'yyyy-MM-dd'),
      state_registration: company.stateRegistration ?? null,
      origin_lead: company.salesCode === 1 ? 'Ecommerce' : 'Winthor',
      email_nfe: company.emailNfe?.trim() ?? null,
      blocked: company.blocked ? 'S' : 'N',
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
    }
  }
}
