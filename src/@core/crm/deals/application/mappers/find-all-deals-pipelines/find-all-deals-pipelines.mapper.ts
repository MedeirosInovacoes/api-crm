import { ReturnPipelineStageByIdHelper } from '@/@core/crm/deals/application/helpers/return-stage-by-id.helper'
import { TFindAllDealsPipelinesOutput } from '@/@core/crm/deals/application/usecases/find-all-deals-pipelines/find-all-deals-pipelines.dto'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

function millisecondsToMinutes(milliseconds: number) {
  const minutes = Math.round(milliseconds / 60000)

  return +minutes.toFixed(0)
}

export class FindAllDealsPipelinesOutputMapper {
  static map(deal: DealEntity, ownerNames: Record<string, any>[]): TFindAllDealsPipelinesOutput {
    const match = ownerNames.find((owner) => owner.id === deal.ownerId)

    return {
      id: deal.id,
      customerCode: deal.customerCode ?? null,
      ownerName: match?.name ?? null,
      name: deal.name.includes('Negócio de')
        ? deal.name.split(' , ')[0].split('Negócio de ')[1]
        : deal.name,
      companyId: deal.companyId,
      stage: ReturnPipelineStageByIdHelper.execute(deal.stage),
      pipelineId: ReturnPipelineStageByIdHelper.execute(deal.pipelineId),
      lostBusinessReason: deal.lostBusinessReason,
      unqualifiedBusinessReason: deal.unqualifiedBusinessReason,
      dateEnteredLeadRetrievedADisqualified: deal.dateEnteredLeadRetrievedADisqualified,
      dateEnteredLeadRetrievedAfterSales: deal.dateEnteredLeadRetrievedAfterSales,
      dateEnteredLeadRetrievedALostDeal: deal.dateEnteredLeadRetrievedALostDeal,
      dateEnteredLeadRetrievedAwaitingBilling: deal.dateEnteredLeadRetrievedAwaitingBilling,
      dateEnteredLeadRetrievedBase: deal.dateEnteredLeadRetrievedBase,
      dateEnteredLeadRetrievedCall: deal.dateEnteredLeadRetrievedCall,
      dateEnteredLeadRetrievedContactCS: deal.dateEnteredLeadRetrievedContactCS,
      dateEnteredLeadRetrievedDoneDeal: deal.dateEnteredLeadRetrievedDoneDeal,
      dateEnteredLeadRetrievedFirstTryWhatsapp: deal.dateEnteredLeadRetrievedFirstTryWhatsapp,
      dateEnteredNewsCustomersADisqualified: deal.dateEnteredNewsCustomersADisqualified,
      dateEnteredLeadRetrievedNegotiationSdr: deal.dateEnteredLeadRetrievedNegotiationSdr,
      dateEnteredLeadRetrievedQualifiedWithCredit: deal.dateEnteredLeadRetrievedQualifiedWithCredit,
      dateEnteredLeadRetrievedQualifiedWithoutCredit:
        deal.dateEnteredLeadRetrievedQualifiedWithoutCredit,
      dateEnteredLeadRetrievedReactivation: deal.dateEnteredLeadRetrievedReactivation,
      dateEnteredLeadRetrievedSecondTryWhatsapp: deal.dateEnteredLeadRetrievedSecondTryWhatsapp,
      dateEnteredNewsCustomersAfterSales: deal.dateEnteredNewsCustomersAfterSales,
      dateEnteredNewsCustomersALostDeal: deal.dateEnteredNewsCustomersALostDeal,
      dateEnteredNewsCustomersAwaitingBilling: deal.dateEnteredNewsCustomersAwaitingBilling,
      dateEnteredNewsCustomersBase: deal.dateEnteredNewsCustomersBase,
      dateEnteredNewsCustomersCall: deal.dateEnteredNewsCustomersCall,
      dateEnteredNewsCustomersFirstTryWhatsapp: deal.dateEnteredNewsCustomersFirstTryWhatsapp,
      dateEnteredNewsCustomersNegotiationSdr: deal.dateEnteredNewsCustomersNegotiationSdr,
      dateEnteredNewsCustomersQualifiedWithCredit: deal.dateEnteredNewsCustomersQualifiedWithCredit,
      dateEnteredNewsCustomersQualifiedWithoutCredit:
        deal.dateEnteredNewsCustomersQualifiedWithoutCredit,
      dateEnteredNewsCustomersRegister: deal.dateEnteredNewsCustomersRegister,
      dateEnteredNewsCustomersSecondTryWhatsapp: deal.dateEnteredNewsCustomersSecondTryWhatsapp,
      dateEnteredNewsCustomersDoneDeal: deal.dateEnteredNewsCustomersDoneDeal,
      cumulativeTimeLeadRetrievedADisqualified: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedADisqualified,
      ),
      cumulativeTimeLeadRetrievedAfterSales: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedAfterSales,
      ),
      cumulativeTimeLeadRetrievedALostDeal: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedALostDeal,
      ),
      cumulativeTimeLeadRetrievedAwaitingBilling: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedAwaitingBilling,
      ),
      cumulativeTimeLeadRetrievedBase: millisecondsToMinutes(deal.cumulativeTimeLeadRetrievedBase),
      cumulativeTimeLeadRetrievedCall: millisecondsToMinutes(deal.cumulativeTimeLeadRetrievedCall),
      cumulativeTimeLeadRetrievedContactCS: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedContactCS,
      ),
      cumulativeTimeLeadRetrievedDoneDeal: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedDoneDeal,
      ),
      cumulativeTimeLeadRetrievedFirstTryWhatsapp: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedFirstTryWhatsapp,
      ),
      cumulativeTimeLeadRetrievedNegotiationSdr: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedNegotiationSdr,
      ),
      cumulativeTimeLeadRetrievedQualifiedWithCredit: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedQualifiedWithCredit,
      ),
      cumulativeTimeLeadRetrievedQualifiedWithoutCredit: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedQualifiedWithoutCredit,
      ),
      cumulativeTimeLeadRetrievedReactivation: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedReactivation,
      ),
      cumulativeTimeLeadRetrievedSecondTryWhatsapp: millisecondsToMinutes(
        deal.cumulativeTimeLeadRetrievedSecondTryWhatsapp,
      ),
      cumulativeTimeNewsCustomersADisqualified: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersADisqualified,
      ),
      cumulativeTimeNewsCustomersAfterSales: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersAfterSales,
      ),
      cumulativeTimeNewsCustomersALostDeal: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersALostDeal,
      ),
      cumulativeTimeNewsCustomersAwaitingBilling: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersAwaitingBilling,
      ),
      cumulativeTimeNewsCustomersBase: millisecondsToMinutes(deal.cumulativeTimeNewsCustomersBase),
      cumulativeTimeNewsCustomersCall: millisecondsToMinutes(deal.cumulativeTimeNewsCustomersCall),
      cumulativeTimeNewsCustomersFirstTryWhatsapp: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersFirstTryWhatsapp,
      ),
      cumulativeTimeNewsCustomersNegotiationSdr: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersNegotiationSdr,
      ),
      cumulativeTimeNewsCustomersQualifiedWithCredit: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersQualifiedWithCredit,
      ),
      cumulativeTimeNewsCustomersQualifiedWithoutCredit: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersQualifiedWithoutCredit,
      ),
      cumulativeTimeNewsCustomersRegister: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersRegister,
      ),
      cumulativeTimeNewsCustomersSecondTryWhatsapp: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersSecondTryWhatsapp,
      ),
      cumulativeTimeNewsCustomersDoneDeal: millisecondsToMinutes(
        deal.cumulativeTimeNewsCustomersDoneDeal,
      ),
    }
  }
}
