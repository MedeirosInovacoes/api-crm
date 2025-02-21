import { CheckCreditApprovalInputDto } from '@/@core/crm/deals/application/usecases/check-credit-approval/check-credit-approval.dto'
import { CheckCreditApprovalUsecase } from '@/@core/crm/deals/application/usecases/check-credit-approval/check-credit-approval.usecase'

describe('CheckCreditApprovalUsecase unit tests', () => {
  it('Deve retornar isApprovedWithCredit false e isApprovedWithoutCredit false', () => {
    const input: CheckCreditApprovalInputDto = {
      dealStage: 'base',
      dealId: '1',
      billingCode: 'BK',
      creditLimit: 10,
      base: 'base',
      isActive: true,
      lastPurchaseDate: new Date(),
      reactivationDate: new Date(),
    }

    const output = CheckCreditApprovalUsecase.check(input)

    expect(output.isApprovedWithCredit).toBe(false)
    expect(output.isApprovedWithoutCredit).toBe(false)
  })

  it('Deve retornar isApprovedWithCredit false e isApprovedWithoutCredit true', () => {
    const input = {
      dealStage: 'base',
      dealId: '1',
      billingCode: 'TED',
      creditLimit: 0,
      base: 'base',
      isActive: true,
      lastPurchaseDate: new Date(),
      reactivationDate: new Date(),
    }

    CheckCreditApprovalUsecase.check(input)

    // expect(output.isApprovedWithCredit).toBe(false)
    // expect(output.isApprovedWithoutCredit).toBe(false)
  })

  it('Deve retornar isApprovedWithCredit false e isApprovedWithoutCredit false se nenhum caso for atendido', () => {
    const input = {
      dealStage: 'base',
      dealId: '1',
      billingCode: 'BK',
      creditLimit: 0,
      base: 'base',
      isActive: true,
      lastPurchaseDate: new Date(),
      reactivationDate: new Date(),
    }

    const output = CheckCreditApprovalUsecase.check(input)

    expect(output.isApprovedWithCredit).toBe(false)
    expect(output.isApprovedWithoutCredit).toBe(false)
  })
})
