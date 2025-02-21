import { AggregateRoot } from '@/@core/@shared/domain/aggregate-root'
import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'
import {
  DealCrmBuilder,
  DealCrmBuilderOutputDto,
} from '@/@core/crm/deals/domain/entities/deal-crm.build'

export interface DealConstructorProps {
  companyId: string
  name: string
  stage: string
  closeDate?: Date
  pipelineId: string
  orderNumber?: number
  date?: Date
  amount?: number
  customerCode?: number
  deliveryDate?: Date
  billingDate?: Date
  branchCode?: number
  totalWeight?: string
  quantityItems?: number
  valueServed?: number
  limit?: number
  loadNumber?: number
  supervisorCode?: number
  supervisorDescription?: string
  paymentPlanCode?: number
  paymentPlanDescription?: string
  salesCode?: number
  salesDescription?: string
  mediumTerm?: number
  noteNumber?: number
  salesTransactionCode?: number
  middleOrder?: string
  bonusValue?: string
  unqualifiedBusinessReason?: string
  lostBusinessReason?: string
  orderItems?: {
    id: string
  }[]
  ownerId?: string
  ownerName?: string
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
  //
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
  //
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
  //
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
  createdAt?: Date
  updatedAt?: Date
}

export class DealEntity extends AggregateRoot {
  private _id: string
  private _props: DealConstructorProps = {} as DealConstructorProps

  constructor(props: DealConstructorProps, id?: string) {
    super()
    this._id = id
    this._props = props
  }

  static create(props: DealConstructorProps, id?: string): DealEntity {
    return new DealEntity(props, id)
  }

  static createOrderFromCustomer({
    id,
    companyId,
    pipelineId,
    stage,
    customerCode,
    limit,
    name,
    order,
  }: {
    id?: string
    name: string
    customerCode: number
    limit: number
    companyId: string
    stage: string
    pipelineId: string
    order: OrderEntity
  }): DealEntity {
    return new DealEntity(
      {
        name,
        limit,
        stage,
        companyId,
        pipelineId,
        customerCode,
        amount: +order?.amount,
        loadNumber: order?.loadCode,
        orderNumber: order?.orderCode,
        noteNumber: order?.noteCode,
        billingDate: order?.billingDate,
        deliveryDate: order?.deliveryDate,
        date: order?.date,
        branchCode: order?.branchCode,
        mediumTerm: order?.mediumTerm,
        quantityItems: order?.quantityItems,
        middleOrder: order?.middleOrder,
        paymentPlanCode: order?.paymentPlanCode,
        paymentPlanDescription: order?.paymentPlanDescription,
        salesCode: order?.salesCode,
        salesDescription: order?.salesDescription,
        salesTransactionCode: order?.salesTransactionCode,
        supervisorCode: order?.supervisorCode,
        supervisorDescription: order?.supervisorDescription,
        totalWeight: order?.totalWeight,
        valueServed: order?.valueServed,
        bonusValue: order?.bonusValue,
      },
      id,
    )
  }

  changeStage(stage: string) {
    this._props.stage = stage
  }

  changePipelineId(pipelineId: string) {
    this._props.pipelineId = pipelineId
  }

  changeDeliveryDate(deliveryDate: Date) {
    this._props.deliveryDate = deliveryDate
  }

  static fake() {
    return DealFakeBuilder
  }

  get id(): string {
    return this._id
  }

  get companyId(): string {
    return this._props.companyId
  }

  get name(): string {
    return this._props.name
  }

  get stage(): string {
    return this._props.stage
  }

  get closeDate(): Date {
    return this._props.closeDate
  }

  get pipelineId(): string {
    return this._props.pipelineId
  }

  get orderNumber(): number {
    return this._props.orderNumber
  }

  get ownerId(): string {
    return this._props.ownerId
  }

  get ownerName(): string {
    return this._props.ownerName
  }

  get date(): Date {
    return this._props.date
  }

  get amount(): number {
    return this._props.amount
  }

  get customerCode(): number {
    return this._props.customerCode
  }

  get deliveryDate(): Date {
    return this._props.deliveryDate
  }

  get billingDate(): Date {
    return this._props.billingDate
  }

  get branchCode(): number {
    return this._props.branchCode
  }

  get totalWeight(): string {
    return this._props.totalWeight
  }

  get quantityItems(): number {
    return this._props.quantityItems
  }

  get valueServed(): number {
    return this._props.valueServed
  }

  get limit(): number {
    return this._props.limit
  }

  get unqualifiedBusinessReason(): string {
    return this._props.unqualifiedBusinessReason
  }

  get lostBusinessReason(): string {
    return this._props.lostBusinessReason
  }

  get loadNumber(): number {
    return this._props.loadNumber
  }

  get supervisorCode(): number {
    return this._props.supervisorCode
  }

  get supervisorDescription(): string {
    return this._props.supervisorDescription
  }

  get paymentPlanCode(): number {
    return this._props.paymentPlanCode
  }

  get paymentPlanDescription(): string {
    return this._props.paymentPlanDescription
  }

  get salesCode(): number {
    return this._props.salesCode
  }

  get salesDescription(): string {
    return this._props.salesDescription
  }

  get mediumTerm(): number {
    return this._props.mediumTerm
  }

  get noteNumber(): number {
    return this._props.noteNumber
  }

  get salesTransactionCode(): number {
    return this._props.salesTransactionCode
  }

  get middleOrder(): string {
    return this._props.middleOrder
  }

  get bonusValue(): string {
    return this._props.bonusValue
  }

  get orderItems(): { id: string }[] {
    return this._props.orderItems
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date {
    return this._props.updatedAt
  }

  get dateEnteredLeadRetrievedBase(): Date {
    return this._props.dateEnteredLeadRetrievedBase
  }

  get dateEnteredLeadRetrievedFirstTryWhatsapp(): Date {
    return this._props.dateEnteredLeadRetrievedFirstTryWhatsapp
  }

  get dateEnteredLeadRetrievedSecondTryWhatsapp(): Date {
    return this._props.dateEnteredLeadRetrievedSecondTryWhatsapp
  }

  get dateEnteredLeadRetrievedCall(): Date {
    return this._props.dateEnteredLeadRetrievedCall
  }

  get dateEnteredLeadRetrievedContactCS(): Date {
    return this._props.dateEnteredLeadRetrievedContactCS
  }

  get dateEnteredLeadRetrievedReactivation(): Date {
    return this._props.dateEnteredLeadRetrievedReactivation
  }

  get dateEnteredLeadRetrievedQualifiedWithCredit(): Date {
    return this._props.dateEnteredLeadRetrievedQualifiedWithCredit
  }

  get dateEnteredLeadRetrievedQualifiedWithoutCredit(): Date {
    return this._props.dateEnteredLeadRetrievedQualifiedWithoutCredit
  }

  get dateEnteredLeadRetrievedNegotiationSdr(): Date {
    return this._props.dateEnteredLeadRetrievedNegotiationSdr
  }

  get dateEnteredLeadRetrievedAwaitingBilling(): Date {
    return this._props.dateEnteredLeadRetrievedAwaitingBilling
  }

  get dateEnteredLeadRetrievedDoneDeal(): Date {
    return this._props.dateEnteredLeadRetrievedDoneDeal
  }

  get dateEnteredLeadRetrievedAfterSales(): Date {
    return this._props.dateEnteredLeadRetrievedAfterSales
  }

  get dateEnteredLeadRetrievedALostDeal(): Date {
    return this._props.dateEnteredLeadRetrievedALostDeal
  }

  get dateEnteredLeadRetrievedADisqualified(): Date {
    return this._props.dateEnteredLeadRetrievedADisqualified
  }

  get dateEnteredNewsCustomersBase(): Date {
    return this._props.dateEnteredNewsCustomersBase
  }

  get dateEnteredNewsCustomersFirstTryWhatsapp(): Date {
    return this._props.dateEnteredNewsCustomersFirstTryWhatsapp
  }

  get dateEnteredNewsCustomersSecondTryWhatsapp(): Date {
    return this._props.dateEnteredNewsCustomersSecondTryWhatsapp
  }

  get dateEnteredNewsCustomersCall(): Date {
    return this._props.dateEnteredNewsCustomersCall
  }

  get dateEnteredNewsCustomersRegister(): Date {
    return this._props.dateEnteredNewsCustomersRegister
  }

  get dateEnteredNewsCustomersQualifiedWithCredit(): Date {
    return this._props.dateEnteredNewsCustomersQualifiedWithCredit
  }

  get dateEnteredNewsCustomersQualifiedWithoutCredit(): Date {
    return this._props.dateEnteredNewsCustomersQualifiedWithoutCredit
  }

  get dateEnteredNewsCustomersNegotiationSdr(): Date {
    return this._props.dateEnteredNewsCustomersNegotiationSdr
  }

  get dateEnteredNewsCustomersAwaitingBilling(): Date {
    return this._props.dateEnteredNewsCustomersAwaitingBilling
  }

  get dateEnteredNewsCustomersDoneDeal(): Date {
    return this._props.dateEnteredNewsCustomersDoneDeal
  }

  get dateEnteredNewsCustomersAfterSales(): Date {
    return this._props.dateEnteredNewsCustomersAfterSales
  }

  get dateEnteredNewsCustomersALostDeal(): Date {
    return this._props.dateEnteredNewsCustomersALostDeal
  }

  get dateEnteredNewsCustomersADisqualified(): Date {
    return this._props.dateEnteredNewsCustomersADisqualified
  }

  get cumulativeTimeLeadRetrievedBase(): number {
    return this._props.cumulativeTimeLeadRetrievedBase
  }

  get cumulativeTimeLeadRetrievedFirstTryWhatsapp(): number {
    return this._props.cumulativeTimeLeadRetrievedFirstTryWhatsapp
  }

  get cumulativeTimeLeadRetrievedSecondTryWhatsapp(): number {
    return this._props.cumulativeTimeLeadRetrievedSecondTryWhatsapp
  }

  get cumulativeTimeLeadRetrievedCall(): number {
    return this._props.cumulativeTimeLeadRetrievedCall
  }

  get cumulativeTimeLeadRetrievedContactCS(): number {
    return this._props.cumulativeTimeLeadRetrievedContactCS
  }

  get cumulativeTimeLeadRetrievedReactivation(): number {
    return this._props.cumulativeTimeLeadRetrievedReactivation
  }

  get cumulativeTimeLeadRetrievedQualifiedWithCredit(): number {
    return this._props.cumulativeTimeLeadRetrievedQualifiedWithCredit
  }

  get cumulativeTimeLeadRetrievedQualifiedWithoutCredit(): number {
    return this._props.cumulativeTimeLeadRetrievedQualifiedWithoutCredit
  }

  get cumulativeTimeLeadRetrievedNegotiationSdr(): number {
    return this._props.cumulativeTimeLeadRetrievedNegotiationSdr
  }

  get cumulativeTimeLeadRetrievedAwaitingBilling(): number {
    return this._props.cumulativeTimeLeadRetrievedAwaitingBilling
  }

  get cumulativeTimeLeadRetrievedDoneDeal(): number {
    return this._props.cumulativeTimeLeadRetrievedDoneDeal
  }

  get cumulativeTimeLeadRetrievedAfterSales(): number {
    return this._props.cumulativeTimeLeadRetrievedAfterSales
  }

  get cumulativeTimeLeadRetrievedALostDeal(): number {
    return this._props.cumulativeTimeLeadRetrievedALostDeal
  }

  get cumulativeTimeLeadRetrievedADisqualified(): number {
    return this._props.cumulativeTimeLeadRetrievedADisqualified
  }

  get cumulativeTimeNewsCustomersBase(): number {
    return this._props.cumulativeTimeNewsCustomersBase
  }

  get cumulativeTimeNewsCustomersFirstTryWhatsapp(): number {
    return this._props.cumulativeTimeNewsCustomersFirstTryWhatsapp
  }

  get cumulativeTimeNewsCustomersSecondTryWhatsapp(): number {
    return this._props.cumulativeTimeNewsCustomersSecondTryWhatsapp
  }

  get cumulativeTimeNewsCustomersCall(): number {
    return this._props.cumulativeTimeNewsCustomersCall
  }

  get cumulativeTimeNewsCustomersRegister(): number {
    return this._props.cumulativeTimeNewsCustomersRegister
  }

  get cumulativeTimeNewsCustomersQualifiedWithCredit(): number {
    return this._props.cumulativeTimeNewsCustomersQualifiedWithCredit
  }

  get cumulativeTimeNewsCustomersQualifiedWithoutCredit(): number {
    return this._props.cumulativeTimeNewsCustomersQualifiedWithoutCredit
  }

  get cumulativeTimeNewsCustomersNegotiationSdr(): number {
    return this._props.cumulativeTimeNewsCustomersNegotiationSdr
  }

  get cumulativeTimeNewsCustomersAwaitingBilling(): number {
    return this._props.cumulativeTimeNewsCustomersAwaitingBilling
  }

  get cumulativeTimeNewsCustomersDoneDeal(): number {
    return this._props.cumulativeTimeNewsCustomersDoneDeal
  }

  get cumulativeTimeNewsCustomersAfterSales(): number {
    return this._props.cumulativeTimeNewsCustomersAfterSales
  }

  get cumulativeTimeNewsCustomersALostDeal(): number {
    return this._props.cumulativeTimeNewsCustomersALostDeal
  }

  get cumulativeTimeNewsCustomersADisqualified(): number {
    return this._props.cumulativeTimeNewsCustomersADisqualified
  }

  toCrm(): DealCrmBuilderOutputDto {
    return DealCrmBuilder.create(this)
  }

  toJSON(): { id: string } & DealConstructorProps {
    return {
      id: this._id,
      ...this._props,
    }
  }
}
