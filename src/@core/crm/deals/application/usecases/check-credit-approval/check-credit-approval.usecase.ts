import {
  CheckCreditApprovalInputDto,
  CheckCreditApprovalOutputDto,
} from '@/@core/crm/deals/application/usecases/check-credit-approval/check-credit-approval.dto'
import { isAfter } from 'date-fns'

export class CheckCreditApprovalUsecase {
  static check(input: CheckCreditApprovalInputDto): CheckCreditApprovalOutputDto {
    if (
      input.isActive &&
      input.creditLimit > 0 &&
      input.dealStage === input.base &&
      input.reactivationDate &&
      isAfter(input.reactivationDate, input.lastPurchaseDate)
    ) {
      return {
        isApprovedWithCredit: true,
        isApprovedWithoutCredit: false,
      }
    } else if (
      input.isActive &&
      input.creditLimit === 0 &&
      input.billingCode === 'TED' &&
      input.dealStage === input.base &&
      input.reactivationDate &&
      isAfter(input.reactivationDate, input.lastPurchaseDate)
    ) {
      return {
        isApprovedWithCredit: false,
        isApprovedWithoutCredit: true,
      }
    } else if (
      input.isActive &&
      input.creditLimit > 0 &&
      input.dealStage === input.base &&
      input.reactivationDate &&
      isAfter(input.reactivationDate, input.lastPurchaseDate)
    ) {
      return {
        isApprovedWithCredit: true,
        isApprovedWithoutCredit: false,
      }
    } else if (
      input.isActive &&
      input.creditLimit === 0 &&
      input.billingCode === 'TED' &&
      input.dealStage === input.base &&
      input.reactivationDate &&
      isAfter(input.reactivationDate, input.lastPurchaseDate)
    ) {
      return {
        isApprovedWithCredit: false,
        isApprovedWithoutCredit: true,
      }
    } else {
      return {
        isApprovedWithCredit: false,
        isApprovedWithoutCredit: false,
      }
    }
  }
}
