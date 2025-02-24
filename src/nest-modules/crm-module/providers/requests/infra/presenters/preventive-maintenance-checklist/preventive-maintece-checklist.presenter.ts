import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

export class FindAllDealsPipelinesPresenter {
  private static translationMap: Record<string, string> = {
    id: 'id',
    stage: 'etapa',
    customerCode: 'codigoCliente',
    pipelineId: 'pipelineId',
    companyId: 'empresaId',
    ownerName: 'proprietario',
    name: 'nome',
    createdAt: 'dataCriacao',
    lostBusinessReason: 'motivoNegocioPerdido',
    unqualifiedBusinessReason: 'motivoNegocioDesqualificado',
    dateEnteredLeadRetrievedBase: 'dataEntradaBase',
    dateEnteredLeadRetrievedFirstTryWhatsapp: 'dataEntradaPrimeiraTentativaWhatsapp',
    dateEnteredLeadRetrievedSecondTryWhatsapp: 'dataEntradaSegundaTentativaWhatsapp',
    dateEnteredLeadRetrievedCall: 'dataEntradaLigacao',
    dateEnteredLeadRetrievedContactCS: 'dataEntradaContatoCS',
    dateEnteredLeadRetrievedReactivation: 'dataEntradaReativacao',
    dateEnteredLeadRetrievedQualifiedWithCredit: 'dataEntradaQualificadoComCredito',
    dateEnteredLeadRetrievedQualifiedWithoutCredit: 'dataEntradaQualificadoSemCredito',
    dateEnteredLeadRetrievedNegotiationSdr: 'dataEntradaNegociacaoSdr',
    dateEnteredLeadRetrievedAwaitingBilling: 'dataEntradaAguardandoFaturamento',
    dateEnteredLeadRetrievedDoneDeal: 'dataEntradaNegocioFechado',
    dateEnteredLeadRetrievedAfterSales: 'dataEntradaPosVenda',
    dateEnteredLeadRetrievedALostDeal: 'dataEntradaNegocioPerdido',
    dateEnteredLeadRetrievedADisqualified: 'dataEntradaDesqualificado',
    //
    dateEnteredNewsCustomersBase: 'dataEntradaBase',
    dateEnteredNewsCustomersFirstTryWhatsapp: 'dataEntradaPrimeiraTentativaWhatsapp',
    dateEnteredNewsCustomersSecondTryWhatsapp: 'dataEntradaSegundaTentativaWhatsapp',
    dateEnteredNewsCustomersCall: 'dataEntradaLigacao',
    dateEnteredNewsCustomersRegister: 'dataEntradaCadastro',
    dateEnteredNewsCustomersQualifiedWithCredit: 'dataEntradaQualificadoComCredito',
    dateEnteredNewsCustomersQualifiedWithoutCredit: 'dataEntradaQualificadoSemCredito',
    dateEnteredNewsCustomersNegotiationSdr: 'dataEntradaNegociacaoSdr',
    dateEnteredNewsCustomersAwaitingBilling: 'dataEntradaAguardandoFaturamento',
    dateEnteredNewsCustomersDoneDeal: 'dataEntradaNegocioFechado',
    dateEnteredNewsCustomersAfterSales: 'dataEntradaPosVenda',
    dateEnteredNewsCustomersALostDeal: 'dataEntradaNegocioPerdido',
    dateEnteredNewsCustomersADisqualified: 'dataEntradaDesqualificado',

    cumulativeTimeLeadRetrievedBase: 'tempoAcumuladoBase',
    cumulativeTimeLeadRetrievedFirstTryWhatsapp: 'tempoAcumuladoPrimeiraTentativaWhatsapp',
    cumulativeTimeLeadRetrievedSecondTryWhatsapp: 'tempoAcumuladoSegundaTentativaWhatsapp',
    cumulativeTimeLeadRetrievedCall: 'tempoAcumuladoLigacao',
    cumulativeTimeLeadRetrievedContactCS: 'tempoAcumuladoContatoCS',
    cumulativeTimeLeadRetrievedReactivation: 'tempoAcumuladoReativacao',
    cumulativeTimeLeadRetrievedQualifiedWithCredit: 'tempoAcumuladoQualificadoComCredito',
    cumulativeTimeLeadRetrievedQualifiedWithoutCredit: 'tempoAcumuladoQualificadoSemCredito',
    cumulativeTimeLeadRetrievedNegotiationSdr: 'tempoAcumuladoNegociacaoSdr',
    cumulativeTimeLeadRetrievedAwaitingBilling: 'tempoAcumuladoAguardandoFaturamento',
    cumulativeTimeLeadRetrievedDoneDeal: 'tempoAcumuladoNegocioFechado',
    cumulativeTimeLeadRetrievedAfterSales: 'tempoAcumuladoPosVenda',
    cumulativeTimeLeadRetrievedALostDeal: 'tempoAcumuladoNegocioPerdido',
    cumulativeTimeLeadRetrievedADisqualified: 'tempoAcumuladoDesqualificado',

    cumulativeTimeNewsCustomersBase: 'tempoAcumuladoBase',
    cumulativeTimeNewsCustomersFirstTryWhatsapp: 'tempoAcumuladoPrimeiraTentativaWhatsapp',
    cumulativeTimeNewsCustomersSecondTryWhatsapp: 'tempoAcumuladoSegundaTentativaWhatsapp',
    cumulativeTimeNewsCustomersCall: 'tempoAcumuladoLigacao',
    cumulativeTimeNewsCustomersRegister: 'tempoAcumuladoCadastro',
    cumulativeTimeNewsCustomersQualifiedWithCredit: 'tempoAcumuladoQualificadoComCredito',
    cumulativeTimeNewsCustomersQualifiedWithoutCredit: 'tempoAcumuladoQualificadoSemCredito',
    cumulativeTimeNewsCustomersNegotiationSdr: 'tempoAcumuladoNegociacaoSdr',
    cumulativeTimeNewsCustomersAwaitingBilling: 'tempoAcumuladoAguardandoFaturamento',
    cumulativeTimeNewsCustomersDoneDeal: 'tempoAcumuladoNegocioFechado',
    cumulativeTimeNewsCustomersAfterSales: 'tempoAcumuladoPosVenda',
    cumulativeTimeNewsCustomersALostDeal: 'tempoAcumuladoNegocioPerdido',
    cumulativeTimeNewsCustomersADisqualified: 'tempoAcumuladoDesqualificado',
  }

  static translateToPortuguese(data: Record<string, any>): Record<string, any> {
    return Object.entries(data).reduce(
      (translated, [key, value]) => {
        const translatedKey = FindAllDealsPipelinesPresenter.translationMap[key] || key
        translated[translatedKey] = value
        return translated
      },
      {} as Record<string, any>,
    )
  }

  static toJson(input: DealEntity): Record<string, any> {
    const columnsMap = {
      'Clientes recuperados': {
        dateEnteredLeadRetrievedBase: input.dateEnteredLeadRetrievedBase,
        dateEnteredLeadRetrievedFirstTryWhatsapp: input.dateEnteredLeadRetrievedFirstTryWhatsapp,
        dateEnteredLeadRetrievedSecondTryWhatsapp: input.dateEnteredLeadRetrievedSecondTryWhatsapp,
        dateEnteredLeadRetrievedCall: input.dateEnteredLeadRetrievedCall,
        dateEnteredLeadRetrievedContactCS: input.dateEnteredLeadRetrievedContactCS,
        dateEnteredLeadRetrievedReactivation: input.dateEnteredLeadRetrievedReactivation,
        dateEnteredLeadRetrievedQualifiedWithCredit:
          input.dateEnteredLeadRetrievedQualifiedWithCredit,
        dateEnteredLeadRetrievedQualifiedWithoutCredit:
          input.dateEnteredLeadRetrievedQualifiedWithoutCredit,
        dateEnteredLeadRetrievedNegotiationSdr: input.dateEnteredLeadRetrievedNegotiationSdr,
        dateEnteredLeadRetrievedAwaitingBilling: input.dateEnteredLeadRetrievedAwaitingBilling,
        dateEnteredLeadRetrievedDoneDeal: input.dateEnteredLeadRetrievedDoneDeal,
        dateEnteredLeadRetrievedAfterSales: input.dateEnteredLeadRetrievedAfterSales,
        dateEnteredLeadRetrievedALostDeal: input.dateEnteredLeadRetrievedALostDeal,
        dateEnteredLeadRetrievedADisqualified: input.dateEnteredLeadRetrievedADisqualified,
        cumulativeTimeLeadRetrievedBase: input.cumulativeTimeLeadRetrievedBase,
        cumulativeTimeLeadRetrievedFirstTryWhatsapp:
          input.cumulativeTimeLeadRetrievedFirstTryWhatsapp,
        cumulativeTimeLeadRetrievedSecondTryWhatsapp:
          input.cumulativeTimeLeadRetrievedSecondTryWhatsapp,
        cumulativeTimeLeadRetrievedCall: input.cumulativeTimeLeadRetrievedCall,
        cumulativeTimeLeadRetrievedContactCS: input.cumulativeTimeLeadRetrievedContactCS,
        cumulativeTimeLeadRetrievedReactivation: input.cumulativeTimeLeadRetrievedReactivation,
        cumulativeTimeLeadRetrievedQualifiedWithCredit:
          input.cumulativeTimeLeadRetrievedQualifiedWithCredit,
        cumulativeTimeLeadRetrievedQualifiedWithoutCredit:
          input.cumulativeTimeLeadRetrievedQualifiedWithoutCredit,
        cumulativeTimeLeadRetrievedNegotiationSdr: input.cumulativeTimeLeadRetrievedNegotiationSdr,
        cumulativeTimeLeadRetrievedAwaitingBilling:
          input.cumulativeTimeLeadRetrievedAwaitingBilling,
        cumulativeTimeLeadRetrievedDoneDeal: input.cumulativeTimeLeadRetrievedDoneDeal,
        cumulativeTimeLeadRetrievedAfterSales: input.cumulativeTimeLeadRetrievedAfterSales,
        cumulativeTimeLeadRetrievedALostDeal: input.cumulativeTimeLeadRetrievedALostDeal,
        cumulativeTimeLeadRetrievedADisqualified: input.cumulativeTimeLeadRetrievedADisqualified,
      },
      'Clientes novos': {
        dateEnteredNewsCustomersBase: input.dateEnteredNewsCustomersBase,
        dateEnteredNewsCustomersFirstTryWhatsapp: input.dateEnteredNewsCustomersFirstTryWhatsapp,
        dateEnteredNewsCustomersSecondTryWhatsapp: input.dateEnteredNewsCustomersSecondTryWhatsapp,
        dateEnteredNewsCustomersCall: input.dateEnteredNewsCustomersCall,
        dateEnteredNewsCustomersRegister: input.dateEnteredNewsCustomersRegister,
        dateEnteredNewsCustomersQualifiedWithCredit:
          input.dateEnteredNewsCustomersQualifiedWithCredit,
        dateEnteredNewsCustomersQualifiedWithoutCredit:
          input.dateEnteredNewsCustomersQualifiedWithoutCredit,
        dateEnteredNewsCustomersNegotiationSdr: input.dateEnteredNewsCustomersNegotiationSdr,
        dateEnteredNewsCustomersAwaitingBilling: input.dateEnteredNewsCustomersAwaitingBilling,
        dateEnteredNewsCustomersDoneDeal: input.dateEnteredNewsCustomersDoneDeal,
        dateEnteredNewsCustomersAfterSales: input.dateEnteredNewsCustomersAfterSales,
        dateEnteredNewsCustomersALostDeal: input.dateEnteredNewsCustomersALostDeal,
        dateEnteredNewsCustomersADisqualified: input.dateEnteredNewsCustomersADisqualified,
        cumulativeTimeNewsCustomersBase: input.cumulativeTimeNewsCustomersBase,
        cumulativeTimeNewsCustomersFirstTryWhatsapp:
          input.cumulativeTimeNewsCustomersFirstTryWhatsapp,
        cumulativeTimeNewsCustomersSecondTryWhatsapp:
          input.cumulativeTimeNewsCustomersSecondTryWhatsapp,
        cumulativeTimeNewsCustomersCall: input.cumulativeTimeNewsCustomersCall,
        cumulativeTimeNewsCustomersRegister: input.cumulativeTimeNewsCustomersRegister,
        cumulativeTimeNewsCustomersQualifiedWithCredit:
          input.cumulativeTimeNewsCustomersQualifiedWithCredit,
        cumulativeTimeNewsCustomersQualifiedWithoutCredit:
          input.cumulativeTimeNewsCustomersQualifiedWithoutCredit,
        cumulativeTimeNewsCustomersNegotiationSdr: input.cumulativeTimeNewsCustomersNegotiationSdr,
        cumulativeTimeNewsCustomersAwaitingBilling:
          input.cumulativeTimeNewsCustomersAwaitingBilling,
        cumulativeTimeNewsCustomersDoneDeal: input.cumulativeTimeNewsCustomersDoneDeal,
        cumulativeTimeNewsCustomersAfterSales: input.cumulativeTimeNewsCustomersAfterSales,
        cumulativeTimeNewsCustomersALostDeal: input.cumulativeTimeNewsCustomersALostDeal,
        cumulativeTimeNewsCustomersADisqualified: input.cumulativeTimeNewsCustomersADisqualified,
      },
    }

    return {
      id: input.id,
      stage: input.stage,
      name: input.name,
      empresaId: input.companyId,
      proprietario: input.ownerName,
      customerCode: input.customerCode,
      pipelineId: input.pipelineId,
      dataCriacao: input.createdAt,
      lostBusinessReason: input.lostBusinessReason,
      unqualifiedBusinessReason: input.unqualifiedBusinessReason,
      ...columnsMap[input.pipelineId],
    }
  }
}
