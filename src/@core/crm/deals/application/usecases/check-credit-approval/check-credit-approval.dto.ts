export type CheckCreditApprovalInputDto = {
  dealStage: string
  dealId: string
  billingCode: string
  creditLimit: number
  isActive: boolean
  lastPurchaseDate: Date
  reactivationDate: Date
  base: string
}

export type CheckCreditApprovalOutputDto = {
  isApprovedWithCredit: boolean
  isApprovedWithoutCredit: boolean
}
