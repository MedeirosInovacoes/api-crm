import { DealGateway } from '../../../domain/deal.gateway'

export type TFindAllDealsPipelinesInput = {
  costumersId: number
  pipelineId: string
}

export type TFindAllDealsPipelinesOutput = {
  id: string
  customerCode: number
  stage: string
  name: string
  companyId: string
  ownerName: string
  pipelineId: string
  lostBusinessReason: string
  unqualifiedBusinessReason: string
  dateEnteredLeadRetrievedBase?: Date
  dateEnteredLeadRetrievedFirstTryWhatsapp?: Date
  dateEnteredLeadRetrievedSecondTryWhatsapp?: Date
  dateEnteredLeadRetrievedCall?: Date
  dateEnteredLeadRetrievedContactCS?: Date
  dateEnteredLeadRetrievedReactivation?: Date
  dateEnteredLeadRetrievedQualifiedWithCredit?: Date
  dateEnteredLeadRetrievedQualifiedWithoutCredit?: Date
  dateEnteredLeadRetrievedNegotiationSdr?: Date
  dateEnteredLeadRetrievedAwaitingBilling?: Date
  dateEnteredLeadRetrievedDoneDeal?: Date
  dateEnteredLeadRetrievedAfterSales?: Date
  dateEnteredLeadRetrievedALostDeal?: Date
  dateEnteredLeadRetrievedADisqualified?: Date
  dateEnteredNewsCustomersBase?: Date
  dateEnteredNewsCustomersFirstTryWhatsapp?: Date
  dateEnteredNewsCustomersSecondTryWhatsapp?: Date
  dateEnteredNewsCustomersCall?: Date
  dateEnteredNewsCustomersRegister?: Date
  dateEnteredNewsCustomersQualifiedWithCredit?: Date
  dateEnteredNewsCustomersQualifiedWithoutCredit?: Date
  dateEnteredNewsCustomersNegotiationSdr?: Date
  dateEnteredNewsCustomersAwaitingBilling?: Date
  dateEnteredNewsCustomersDoneDeal?: Date
  dateEnteredNewsCustomersAfterSales?: Date
  dateEnteredNewsCustomersALostDeal?: Date
  dateEnteredNewsCustomersADisqualified?: Date
  cumulativeTimeLeadRetrievedBase?: number
  cumulativeTimeLeadRetrievedFirstTryWhatsapp?: number
  cumulativeTimeLeadRetrievedSecondTryWhatsapp?: number
  cumulativeTimeLeadRetrievedCall?: number
  cumulativeTimeLeadRetrievedContactCS?: number
  cumulativeTimeLeadRetrievedReactivation?: number
  cumulativeTimeLeadRetrievedQualifiedWithCredit?: number
  cumulativeTimeLeadRetrievedQualifiedWithoutCredit?: number
  cumulativeTimeLeadRetrievedNegotiationSdr?: number
  cumulativeTimeLeadRetrievedAwaitingBilling?: number
  cumulativeTimeLeadRetrievedDoneDeal?: number
  cumulativeTimeLeadRetrievedAfterSales?: number
  cumulativeTimeLeadRetrievedALostDeal?: number
  cumulativeTimeLeadRetrievedADisqualified?: number
  cumulativeTimeNewsCustomersBase?: number
  cumulativeTimeNewsCustomersFirstTryWhatsapp?: number
  cumulativeTimeNewsCustomersSecondTryWhatsapp?: number
  cumulativeTimeNewsCustomersCall?: number
  cumulativeTimeNewsCustomersRegister?: number
  cumulativeTimeNewsCustomersQualifiedWithCredit?: number
  cumulativeTimeNewsCustomersQualifiedWithoutCredit?: number
  cumulativeTimeNewsCustomersNegotiationSdr?: number
  cumulativeTimeNewsCustomersAwaitingBilling?: number
  cumulativeTimeNewsCustomersDoneDeal?: number
  cumulativeTimeNewsCustomersAfterSales?: number
  cumulativeTimeNewsCustomersALostDeal?: number
  cumulativeTimeNewsCustomersADisqualified?: number
}

export type TFindAllDealsPipelinesDependencies = {
  dealRepository: DealGateway
}
