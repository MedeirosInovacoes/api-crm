import { DEALS_FIELDS } from '@/@core/crm/deals/infra/constants/deals-fields'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { SimplePublicObjectWithAssociations } from '@hubspot/api-client/lib/codegen/crm/companies'
import { subHours } from 'date-fns'

export type DealInfraMapperToDomainInputDto = SimplePublicObjectWithAssociations
export type DealInfraMapperToDomainOutputDto = DealEntity

export class DealInfraMapper {
  static toDomain = (input: DealInfraMapperToDomainInputDto): DealInfraMapperToDomainOutputDto => {
    const findDateByIdStage = (field: string): any => {
      const value = input.properties[field]
      return value ? subHours(value, 3) : null
    }

    const findCumulativeTimeByIdStage = (field: string): any => {
      const value = input.properties[field]
      return value ? +value : null
    }

    return DealEntity.create(
      {
        name: input.properties.dealname,
        customerCode: input.properties.customer_code ? +input.properties.customer_code : null,
        orderNumber: +input.properties.order_number,
        companyId: input.associations?.companies?.results[0].id ?? null,
        stage: input.properties.dealstage,
        pipelineId: input.properties.pipeline,
        noteNumber: +input.properties.note_number,
        ownerId: input.properties.hubspot_owner_id,
        lostBusinessReason: input.properties.closed_lost_reason ?? null,
        unqualifiedBusinessReason: input.properties.negocio_perdido ?? null,
        dateEnteredLeadRetrievedBase: findDateByIdStage(DEALS_FIELDS.dateEnteredLeadRetrievedBase),
        dateEnteredLeadRetrievedFirstTryWhatsapp: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedFirstTryWhatsapp,
        ),
        dateEnteredLeadRetrievedSecondTryWhatsapp: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedSecondTryWhatsapp,
        ),
        dateEnteredLeadRetrievedCall: findDateByIdStage(DEALS_FIELDS.dateEnteredLeadRetrievedCall),
        dateEnteredLeadRetrievedContactCS: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedContactCS,
        ),
        dateEnteredLeadRetrievedReactivation: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedReactivation,
        ),
        dateEnteredLeadRetrievedQualifiedWithCredit: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedQualifiedWithCredit,
        ),
        dateEnteredLeadRetrievedQualifiedWithoutCredit: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedQualifiedWithoutCredit,
        ),
        dateEnteredLeadRetrievedNegotiationSdr: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedNegotiationSdr,
        ),
        dateEnteredLeadRetrievedAwaitingBilling: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedAwaitingBilling,
        ),
        dateEnteredLeadRetrievedDoneDeal: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedDoneDeal,
        ),
        dateEnteredLeadRetrievedAfterSales: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedAfterSales,
        ),
        dateEnteredLeadRetrievedALostDeal: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedALostDeal,
        ),
        dateEnteredLeadRetrievedADisqualified: findDateByIdStage(
          DEALS_FIELDS.dateEnteredLeadRetrievedADisqualified,
        ),
        dateEnteredNewsCustomersBase: findDateByIdStage(DEALS_FIELDS.dateEnteredNewsCustomersBase),
        dateEnteredNewsCustomersFirstTryWhatsapp: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersFirstTryWhatsapp,
        ),
        dateEnteredNewsCustomersSecondTryWhatsapp: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersSecondTryWhatsapp,
        ),
        dateEnteredNewsCustomersCall: findDateByIdStage(DEALS_FIELDS.dateEnteredNewsCustomersCall),
        dateEnteredNewsCustomersRegister: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersRegister,
        ),
        dateEnteredNewsCustomersQualifiedWithCredit: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersQualifiedWithCredit,
        ),
        dateEnteredNewsCustomersQualifiedWithoutCredit: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersQualifiedWithoutCredit,
        ),
        dateEnteredNewsCustomersNegotiationSdr: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersNegotiationSdr,
        ),
        dateEnteredNewsCustomersAwaitingBilling: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersAwaitingBilling,
        ),
        dateEnteredNewsCustomersDoneDeal: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersDoneDeal,
        ),
        dateEnteredNewsCustomersAfterSales: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersAfterSales,
        ),
        dateEnteredNewsCustomersALostDeal: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersALostDeal,
        ),
        dateEnteredNewsCustomersADisqualified: findDateByIdStage(
          DEALS_FIELDS.dateEnteredNewsCustomersADisqualified,
        ),
        cumulativeTimeLeadRetrievedADisqualified: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedADisqualified,
        ),
        cumulativeTimeLeadRetrievedALostDeal: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedALostDeal,
        ),
        cumulativeTimeLeadRetrievedAfterSales: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedAfterSales,
        ),
        cumulativeTimeLeadRetrievedAwaitingBilling: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedAwaitingBilling,
        ),
        cumulativeTimeLeadRetrievedDoneDeal: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedDoneDeal,
        ),
        cumulativeTimeLeadRetrievedFirstTryWhatsapp: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedFirstTryWhatsapp,
        ),
        cumulativeTimeLeadRetrievedNegotiationSdr: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedNegotiationSdr,
        ),
        cumulativeTimeLeadRetrievedQualifiedWithCredit: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedQualifiedWithCredit,
        ),
        cumulativeTimeLeadRetrievedQualifiedWithoutCredit: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedQualifiedWithoutCredit,
        ),
        cumulativeTimeLeadRetrievedReactivation: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedReactivation,
        ),
        cumulativeTimeLeadRetrievedSecondTryWhatsapp: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedSecondTryWhatsapp,
        ),
        cumulativeTimeLeadRetrievedBase: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedBase,
        ),
        cumulativeTimeLeadRetrievedCall: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedCall,
        ),
        cumulativeTimeLeadRetrievedContactCS: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeLeadRetrievedContactCS,
        ),
        cumulativeTimeNewsCustomersADisqualified: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersADisqualified,
        ),
        cumulativeTimeNewsCustomersALostDeal: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersALostDeal,
        ),
        cumulativeTimeNewsCustomersAfterSales: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersAfterSales,
        ),
        cumulativeTimeNewsCustomersAwaitingBilling: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersAwaitingBilling,
        ),
        cumulativeTimeNewsCustomersDoneDeal: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersDoneDeal,
        ),
        cumulativeTimeNewsCustomersFirstTryWhatsapp: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersFirstTryWhatsapp,
        ),
        cumulativeTimeNewsCustomersNegotiationSdr: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersNegotiationSdr,
        ),
        cumulativeTimeNewsCustomersQualifiedWithCredit: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersQualifiedWithCredit,
        ),
        cumulativeTimeNewsCustomersQualifiedWithoutCredit: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersQualifiedWithoutCredit,
        ),
        cumulativeTimeNewsCustomersRegister: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersRegister,
        ),
        cumulativeTimeNewsCustomersBase: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersBase,
        ),
        cumulativeTimeNewsCustomersCall: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersCall,
        ),
        cumulativeTimeNewsCustomersSecondTryWhatsapp: findCumulativeTimeByIdStage(
          DEALS_FIELDS.cumulativeTimeNewsCustomersSecondTryWhatsapp,
        ),
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        closeDate: input.properties.closedate ? new Date(input.properties.closedate) : null,
      },
      input.id,
    )
  }
}
