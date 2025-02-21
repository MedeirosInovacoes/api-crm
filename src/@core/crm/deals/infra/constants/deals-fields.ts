import { env } from '@/@core/@shared/infra/env'

const getIdForEnvironment = (prodId: string, devId: string): string => {
  return env.NODE_ENV === 'production' ? prodId : devId
}

const getDateEnteredFieldName = (prod: string, dev: string) => {
  return 'hs_v2_date_entered_' + getIdForEnvironment(prod, dev)
}

const getCumulativeTimeFieldName = (prod: string, dev: string) => {
  return 'hs_v2_cumulative_time_in_' + getIdForEnvironment(prod, dev)
}

export const DEALS_FIELDS = {
  // Clientes Recuperados
  // Data de entrada
  dateEnteredLeadRetrievedBase: getDateEnteredFieldName('203437100', '203404191'),
  dateEnteredLeadRetrievedFirstTryWhatsapp: getDateEnteredFieldName('230627908', '235533589'),
  dateEnteredLeadRetrievedSecondTryWhatsapp: getDateEnteredFieldName('203437101', '203793317'),
  dateEnteredLeadRetrievedCall: getDateEnteredFieldName('222033408', '943919758'),
  dateEnteredLeadRetrievedContactCS: getDateEnteredFieldName('203437102', '203404194'),
  dateEnteredLeadRetrievedReactivation: getDateEnteredFieldName('203437103', '204197386'),
  dateEnteredLeadRetrievedQualifiedWithCredit: getDateEnteredFieldName('203437104', '203404192'),
  dateEnteredLeadRetrievedQualifiedWithoutCredit: getDateEnteredFieldName('208657931', '203404193'),
  dateEnteredLeadRetrievedNegotiationSdr: getDateEnteredFieldName('208657932', '203793320'),
  dateEnteredLeadRetrievedAwaitingBilling: getDateEnteredFieldName('221805614', '222280230'),
  dateEnteredLeadRetrievedDoneDeal: getDateEnteredFieldName('208105519', '203404196'),
  dateEnteredLeadRetrievedAfterSales: getDateEnteredFieldName('208657933', '204200358'),
  dateEnteredLeadRetrievedALostDeal: getDateEnteredFieldName('203437106', '203404197'),
  dateEnteredLeadRetrievedADisqualified: getDateEnteredFieldName('211768223', '943763314'),
  // Tempo acumulado
  cumulativeTimeLeadRetrievedBase: getCumulativeTimeFieldName('203437100', '203404191'),
  cumulativeTimeLeadRetrievedFirstTryWhatsapp: getCumulativeTimeFieldName('230627908', '235533589'),
  cumulativeTimeLeadRetrievedSecondTryWhatsapp: getCumulativeTimeFieldName(
    '203437101',
    '203793317',
  ),
  cumulativeTimeLeadRetrievedCall: getCumulativeTimeFieldName('222033408', '943919758'),
  cumulativeTimeLeadRetrievedContactCS: getCumulativeTimeFieldName('203437102', '203404194'),
  cumulativeTimeLeadRetrievedReactivation: getCumulativeTimeFieldName('203437103', '204197386'),
  cumulativeTimeLeadRetrievedQualifiedWithCredit: getCumulativeTimeFieldName(
    '203437104',
    '203404192',
  ),
  cumulativeTimeLeadRetrievedQualifiedWithoutCredit: getCumulativeTimeFieldName(
    '208657931',
    '203404193',
  ),
  cumulativeTimeLeadRetrievedNegotiationSdr: getCumulativeTimeFieldName('208657932', '203793320'),
  cumulativeTimeLeadRetrievedAwaitingBilling: getCumulativeTimeFieldName('221805614', '222280230'),
  cumulativeTimeLeadRetrievedDoneDeal: getCumulativeTimeFieldName('208105519', '203404196'),
  cumulativeTimeLeadRetrievedAfterSales: getCumulativeTimeFieldName('208657933', '204200358'),
  cumulativeTimeLeadRetrievedALostDeal: getCumulativeTimeFieldName('203437106', '203404197'),
  cumulativeTimeLeadRetrievedADisqualified: getCumulativeTimeFieldName('211768223', '943763314'),

  // Cliente Novos
  // Data de entrada
  dateEnteredNewsCustomersBase: getDateEnteredFieldName('166567211', '177622905'),
  dateEnteredNewsCustomersFirstTryWhatsapp: getDateEnteredFieldName(
    'appointmentscheduled',
    '943861105',
  ),
  dateEnteredNewsCustomersSecondTryWhatsapp: getDateEnteredFieldName('221923087', '943861106'),
  dateEnteredNewsCustomersCall: getDateEnteredFieldName('221956626', '943861107'),
  dateEnteredNewsCustomersRegister: getDateEnteredFieldName('221956647', '195735863'),
  dateEnteredNewsCustomersQualifiedWithCredit: getDateEnteredFieldName(
    'qualifiedtobuy',
    '177622906',
  ),
  dateEnteredNewsCustomersQualifiedWithoutCredit: getDateEnteredFieldName('194770565', '195735864'),
  dateEnteredNewsCustomersNegotiationSdr: getDateEnteredFieldName('closedwon', '177622909'),
  dateEnteredNewsCustomersAwaitingBilling: getDateEnteredFieldName('222033316', '177622907'),
  dateEnteredNewsCustomersDoneDeal: getDateEnteredFieldName('presentationscheduled', '177622910'),
  dateEnteredNewsCustomersAfterSales: getDateEnteredFieldName('262732897', '177622908'),
  dateEnteredNewsCustomersALostDeal: getDateEnteredFieldName('204238483', '177622911'),
  dateEnteredNewsCustomersADisqualified: getDateEnteredFieldName('closedlost', '943861108'),

  // Tempo acumulado
  cumulativeTimeNewsCustomersBase: getCumulativeTimeFieldName('166567211', '177622905'),
  cumulativeTimeNewsCustomersFirstTryWhatsapp: getCumulativeTimeFieldName(
    'appointmentscheduled',
    '943861105',
  ),
  cumulativeTimeNewsCustomersSecondTryWhatsapp: getCumulativeTimeFieldName(
    '221923087',
    '943861106',
  ),
  cumulativeTimeNewsCustomersCall: getCumulativeTimeFieldName('221956626', '943861107'),
  cumulativeTimeNewsCustomersRegister: getCumulativeTimeFieldName('221956647', '195735863'),
  cumulativeTimeNewsCustomersQualifiedWithCredit: getCumulativeTimeFieldName(
    'qualifiedtobuy',
    '177622906',
  ),
  cumulativeTimeNewsCustomersQualifiedWithoutCredit: getCumulativeTimeFieldName(
    '194770565',
    '195735864',
  ),
  cumulativeTimeNewsCustomersNegotiationSdr: getCumulativeTimeFieldName('closedwon', '177622909'),
  cumulativeTimeNewsCustomersAwaitingBilling: getCumulativeTimeFieldName('222033316', '177622907'),
  cumulativeTimeNewsCustomersDoneDeal: getCumulativeTimeFieldName(
    'presentationscheduled',
    '177622910',
  ),
  cumulativeTimeNewsCustomersAfterSales: getCumulativeTimeFieldName('262732897', '177622908'),
  cumulativeTimeNewsCustomersALostDeal: getCumulativeTimeFieldName('204238483', '177622911'),
  cumulativeTimeNewsCustomersADisqualified: getCumulativeTimeFieldName('closedlost', '943861108'),
}
