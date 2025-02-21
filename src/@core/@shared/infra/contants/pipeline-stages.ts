import { env } from '@/@core/@shared/infra/env'

const getIdForEnvironment = (prodId: string, devId: string): string => {
  return env.NODE_ENV === 'production' ? prodId : devId
}

export const PIPELINES_STAGES = {
  [env.LEAD_RETRIEVAL_PIPELINE_ID]: {
    [getIdForEnvironment('114683507', '114651150')]: 'Clientes recuperados',
    [getIdForEnvironment('203437100', '203404191')]: 'Base de clientes',
    [getIdForEnvironment('230627908', '235533589')]: '1º tentativa whatsapp',
    [getIdForEnvironment('203437101', '203793317')]: '2º tentativa whatsapp',
    [getIdForEnvironment('222033408', '943919758')]: 'Ligação',
    [getIdForEnvironment('203437102', '203404194')]: 'Contato CS',
    [getIdForEnvironment('203437103', '204197386')]: 'Reativação',
    [getIdForEnvironment('203437104', '203404192')]: 'Qualificado com crédito',
    [getIdForEnvironment('208657931', '203404193')]: 'Qualificado sem crédito',
    [getIdForEnvironment('208657932', '203793320')]: 'Negociação SDR',
    [getIdForEnvironment('221805614', '222280230')]: 'Aguardando faturamento',
    [getIdForEnvironment('208105519', '203404196')]: 'Negócio fechado',
    [getIdForEnvironment('208657933', '204200358')]: 'Pós vendas',
    [getIdForEnvironment('203437106', '203404197')]: 'Negócio perdido',
    [getIdForEnvironment('211768223', '943763314')]: 'Desqualificado',
  },
  [env.NEWS_CUSTOMERS_PIPELINE_ID]: {
    [getIdForEnvironment('default', '97084840')]: 'Clientes novos',
    [getIdForEnvironment('166567211', '177622905')]: 'Base de clientes',
    [getIdForEnvironment('appointmentscheduled', '943861105')]: '1º tentativa whatsapp',
    [getIdForEnvironment('221923087', '943861106')]: '2º tentativa whatsapp',
    [getIdForEnvironment('221956626', '943861107')]: 'Ligação',
    [getIdForEnvironment('221956647', '195735863')]: 'Cadastro',
    [getIdForEnvironment('194770565', '195735864')]: 'Qualificado sem crédito',
    [getIdForEnvironment('qualifiedtobuy', '177622906')]: 'Qualificado com crédito',
    [getIdForEnvironment('closedwon', '177622909')]: 'Negociação SDR',
    [getIdForEnvironment('222033316', '177622907')]: 'Aguardando faturamento',
    [getIdForEnvironment('presentationscheduled', '177622910')]: 'Negócio fechado',
    [getIdForEnvironment('262732897', '177622908')]: 'Pós vendas',
    [getIdForEnvironment('204238483', '177622911')]: 'Negócio perdido',
    [getIdForEnvironment('closedlost', '943861108')]: 'Desqualificado',
  },
}
