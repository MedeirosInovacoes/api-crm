import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { format } from 'date-fns'

export type DealCrmBuilderOutputDto = {
  dealname: string
  dealstage: string
  closedate: string
  order_number: string
  date: string
  amount: string
  customer_code: string
  billing_date: string
  branch_code: string
  total_weight: string
  quantity_items: string
  limit: string
  load_number: string
  supervisor_code: string
  supervisor_description: string
  payment_plan_code: string
  payment_plan_description: string
  sales_code: string
  sales_description: string
  medium_term: string
  note_number: string
  sales_transaction_code: string
  middle_order: string
  bonus_value: string
}

export class DealCrmBuilder {
  static create(deal: DealEntity): DealCrmBuilderOutputDto {
    return {
      dealname: deal.name,
      dealstage: deal.stage,
      closedate: deal.closeDate?.toISOString(),
      amount: Number(deal.valueServed)?.toFixed(2).toString(),
      customer_code: deal.customerCode?.toString(),
      load_number: deal.loadNumber?.toString(),
      order_number: deal.orderNumber?.toString(),
      note_number: deal.noteNumber?.toString(),
      limit: deal.limit?.toFixed(2).toString(),
      billing_date: deal.billingDate ? format(deal.billingDate, 'yyyy-MM-dd') : null,
      date: deal.date ? format(deal.date, 'yyyy-MM-dd') : null,
      branch_code: deal.branchCode?.toString(),
      medium_term: deal.mediumTerm?.toString(),
      quantity_items: deal.quantityItems?.toString(),
      middle_order: deal.middleOrder,
      payment_plan_code: deal.paymentPlanCode?.toString(),
      payment_plan_description: deal.paymentPlanDescription,
      sales_code: deal.salesCode?.toString(),
      sales_description: deal.salesDescription,
      sales_transaction_code: deal.salesTransactionCode?.toString(),
      supervisor_code: deal.supervisorCode?.toString(),
      supervisor_description: deal.supervisorDescription,
      total_weight: deal.totalWeight && (+deal.totalWeight).toFixed(2),
      bonus_value: deal.bonusValue && (+deal.bonusValue).toFixed(2),
    }
  }
}
