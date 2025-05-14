import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

export class DealFakeBuilder<TBuild = any> extends FakeBuilder {
  private _id: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000000, max: 999999999 }).toString()
  private _companyId: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 999999999 }).toString()
  private _name: PropOrFactory<string> = () => this.chance.name()
  private _stage: PropOrFactory<string> = () => this.chance.word()
  private _closeDate?: PropOrFactory<Date> = () => this.chance.date()
  private _pipelineId: PropOrFactory<string> = () => this.chance.guid()
  private _orderNumber?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999999 })
  private _date?: PropOrFactory<Date> = () => this.chance.date()
  private _amount?: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999999 })
  private _customerCode?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999999 })
  private _deliveryDate?: PropOrFactory<Date> = () => this.chance.date()
  private _billingDate?: PropOrFactory<Date> = () => this.chance.date()
  private _branchCode?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999999 })
  private _totalWeight?: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 99999999 }).toString()
  private _quantityItems?: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 1000 })
  private _valueServed?: PropOrFactory<string> = () =>
    this.chance.floating({ min: 0, max: 99999999 }).toString()
  private _limit?: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999999 })
  private _loadNumber?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999999 })
  private _supervisorCode?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 9999 })
  private _supervisorDescription?: PropOrFactory<string> = () => this.chance.name()
  private _paymentPlanCode?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 9999 })
  private _paymentPlanDescription?: PropOrFactory<string> = () => this.chance.name()
  private _salesCode?: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 9999 })
  private _salesDescription?: PropOrFactory<string> = () => this.chance.name()
  private _mediumTerm?: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 12 })
  private _noteNumber?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999999 })
  private _salesTransactionCode?: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 9999 })
  private _middleOrder?: PropOrFactory<string> = () => this.chance.word()
  private _bonusValue?: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 99999999 }).toString()
  private _orderItems?: PropOrFactory<{ id: string }[]> = () => [
    { id: this.chance.integer({ min: 1000, max: 9999 }).toString() },
    { id: this.chance.integer({ min: 1000, max: 9999 }).toString() },
    { id: this.chance.integer({ min: 1000, max: 9999 }).toString() },
  ]
  private _createdAt?: PropOrFactory<Date> = () => this.chance.date()
  private _updatedAt?: PropOrFactory<Date> = () => this.chance.date()

  optional: string[] = [
    'closeDate',
    'orderNumber',
    'date',
    'amount',
    'customerCode',
    'deliveryDate',
    'billingDate',
    'branchCode',
    'totalWeight',
    'quantityItems',
    'valueServed',
    'limit',
    'loadNumber',
    'supervisorCode',
    'supervisorDescription',
    'paymentPlanCode',
    'paymentPlanDescription',
    'salesCode',
    'salesDescription',
    'mediumTerm',
    'noteNumber',
    'salesTransactionCode',
    'middleOrder',
    'bonusValue',
    'orderItems',
    'createdAt',
    'updatedAt',
  ]

  static aDeal() {
    return new DealFakeBuilder<DealEntity>()
  }

  static theDeals(countObjs: number) {
    return new DealFakeBuilder<DealEntity[]>(countObjs)
  }

  build(): TBuild {
    const deals = new Array(this.countObjs).fill(undefined).map((_, index) => {
      const deal = new DealEntity(
        {
          companyId: !this._companyId ? undefined : this.callFactory(this._companyId, index),
          name: this.callFactory(this._name, index),
          stage: this.callFactory(this._stage, index),
          closeDate: this.callFactory(this._closeDate, index),
          pipelineId: this.callFactory(this._pipelineId, index),
          orderNumber: this.callFactory(this._orderNumber, index),
          date: this.callFactory(this._date, index),
          amount: this.callFactory(this._amount, index),
          customerCode: this.callFactory(this._customerCode, index),
          deliveryDate: this.callFactory(this._deliveryDate, index),
          billingDate: this.callFactory(this._billingDate, index),
          branchCode: this.callFactory(this._branchCode, index),
          totalWeight: this.callFactory(this._totalWeight, index),
          quantityItems: this.callFactory(this._quantityItems, index),
          valueServed: this.callFactory(this._valueServed, index),
          limit: this.callFactory(this._limit, index),
          loadNumber: this.callFactory(this._loadNumber, index),
          supervisorCode: this.callFactory(this._supervisorCode, index),
          supervisorDescription: this.callFactory(this._supervisorDescription, index),
          paymentPlanCode: this.callFactory(this._paymentPlanCode, index),
          paymentPlanDescription: this.callFactory(this._paymentPlanDescription, index),
          salesCode: this.callFactory(this._salesCode, index),
          salesDescription: this.callFactory(this._salesDescription, index),
          mediumTerm: this.callFactory(this._mediumTerm, index),
          noteNumber: this.callFactory(this._noteNumber, index),
          salesTransactionCode: this.callFactory(this._salesTransactionCode, index),
          bonusValue: this.callFactory(this._bonusValue, index),
          orderItems: this.callFactory(this._orderItems, index),
          createdAt: this.callFactory(this._createdAt, index),
          updatedAt: this.callFactory(this._updatedAt, index),
          middleOrder: this.callFactory(this._middleOrder, index),
        },
        this.callFactory(this._id, index),
      )
      return deal
    })

    // @ts-ignore
    return this.countObjs === 1 ? (deals[0] as any) : deals
  }

  withCompanyId(companyId: PropOrFactory<string>): this {
    this._companyId = companyId
    return this
  }

  withName(name: PropOrFactory<string>): this {
    this._name = name
    return this
  }

  withStage(stage: PropOrFactory<string>): this {
    this._stage = stage
    return this
  }

  withCloseDate(closeDate: Date): this {
    this._closeDate = closeDate
    return this
  }

  withPipelineId(pipelineId: string): this {
    this._pipelineId = pipelineId
    return this
  }

  withOrderNumber(orderNumber: number): this {
    this._orderNumber = orderNumber
    return this
  }

  withDate(date: Date): this {
    this._date = date
    return this
  }

  withAmount(amount: number): this {
    this._amount = amount
    return this
  }

  withCustomerCode(customerCode: number): this {
    this._customerCode = customerCode
    return this
  }

  withDeliveryDate(deliveryDate: Date): this {
    this._deliveryDate = deliveryDate
    return this
  }

  withBillingDate(billingDate: Date): this {
    this._billingDate = billingDate
    return this
  }

  withBranchCode(branchCode: number): this {
    this._branchCode = branchCode
    return this
  }

  withTotalWeight(totalWeight: string): this {
    this._totalWeight = totalWeight
    return this
  }

  withQuantityItems(quantityItems: number): this {
    this._quantityItems = quantityItems
    return this
  }

  withValueServed(valueServed: string): this {
    this._valueServed = valueServed
    return this
  }

  withLimit(limit: number): this {
    this._limit = limit
    return this
  }

  withLoadNumber(loadNumber: number): this {
    this._loadNumber = loadNumber
    return this
  }

  withSupervisorCode(supervisorCode: number): this {
    this._supervisorCode = supervisorCode
    return this
  }

  withSupervisorDescription(supervisorDescription: string): this {
    this._supervisorDescription = supervisorDescription
    return this
  }

  withPaymentPlanCode(paymentPlanCode: number): this {
    this._paymentPlanCode = paymentPlanCode
    return this
  }

  withPaymentPlanDescription(paymentPlanDescription: string): this {
    this._paymentPlanDescription = paymentPlanDescription
    return this
  }

  withSalesCode(salesCode: number): this {
    this._salesCode = salesCode
    return this
  }

  withSalesDescription(salesDescription: string): this {
    this._salesDescription = salesDescription
    return this
  }

  withMediumTerm(mediumTerm: number): this {
    this._mediumTerm = mediumTerm
    return this
  }

  withNoteNumber(noteNumber: number): this {
    this._noteNumber = noteNumber
    return this
  }

  withSalesTransactionCode(salesTransactionCode: number): this {
    this._salesTransactionCode = salesTransactionCode
    return this
  }

  withMiddleOrder(middleOrder: string): this {
    this._middleOrder = middleOrder
    return this
  }

  withBonusValue(bonusValue: string): this {
    this._bonusValue = bonusValue
    return this
  }

  withOrderItems(orderItems: { id: string }[]): this {
    this._orderItems = orderItems
    return this
  }

  withCreatedAt(createdAt: Date): this {
    this._createdAt = createdAt
    return this
  }

  withUpdatedAt(updatedAt: Date): this {
    this._updatedAt = updatedAt
    return this
  }

  get companyId(): string {
    return this.getValue('companyId')
  }

  get name(): string {
    return this.getValue('name')
  }

  get stage(): string {
    return this.getValue('stage')
  }

  get closeDate(): Date {
    return this.getValue('closeDate')
  }

  get pipelineId(): string {
    return this.getValue('pipelineId')
  }

  get orderNumber(): number {
    return this.getValue('orderNumber')
  }

  get date(): Date {
    return this.getValue('date')
  }

  get amount(): number {
    return this.getValue('amount')
  }

  get customerCode(): number {
    return this.getValue('customerCode')
  }

  get deliveryDate(): Date {
    return this.getValue('deliveryDate')
  }

  get billingDate(): Date {
    return this.getValue('billingDate')
  }

  get branchCode(): number {
    return this.getValue('branchCode')
  }

  get totalWeight(): string {
    return this.getValue('totalWeight')
  }

  get quantityItems(): number {
    return this.getValue('quantityItems')
  }

  get valueServed(): string {
    return this.getValue('valueServed')
  }

  get limit(): number {
    return this.getValue('limit')
  }

  get loadNumber(): number {
    return this.getValue('loadNumber')
  }

  get supervisorCode(): number {
    return this.getValue('supervisorCode')
  }

  get supervisorDescription(): string {
    return this.getValue('supervisorDescription')
  }

  get paymentPlanCode(): number {
    return this.getValue('paymentPlanCode')
  }

  get paymentPlanDescription(): string {
    return this.getValue('paymentPlanDescription')
  }

  get salesCode(): number {
    return this.getValue('salesCode')
  }

  get salesDescription(): string {
    return this.getValue('salesDescription')
  }

  get mediumTerm(): number {
    return this.getValue('mediumTerm')
  }

  get noteNumber(): number {
    return this.getValue('noteNumber')
  }

  get salesTransactionCode(): number {
    return this.getValue('salesTransactionCode')
  }

  get middleOrder(): string {
    return this.getValue('middleOrder')
  }

  get bonusValue(): string {
    return this.getValue('bonusValue')
  }

  get orderItems(): { id: string }[] {
    return this.getValue('orderItems')
  }

  get createdAt(): Date {
    return this.getValue('createdAt')
  }

  get updatedAt(): Date {
    return this.getValue('updatedAt')
  }
}
