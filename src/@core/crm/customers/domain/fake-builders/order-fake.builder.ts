import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'

export class OrderFakeBuilder<TBuild = any> extends FakeBuilder {
  private _customerCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 9999 })
  private _amount: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 99999 }).toString()
  private _loadCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999 })
  private _orderCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999 })
  private _noteCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999 })
  private _billingDate: PropOrFactory<Date> = () =>
    this._position == 'F' ? this.chance.date() : null
  private _deliveryDate: PropOrFactory<Date> = () =>
    this._position == 'F' ? this.chance.date() : null
  private _position: PropOrFactory<string> = () => this.chance.pickone(['F', 'L'])
  private _date: PropOrFactory<Date> = () => this.chance.date()
  private _branchCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999 })
  private _mediumTerm: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999 })
  private _quantityItems: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 200 })
  private _middleOrder: PropOrFactory<string> = () => this.chance.word()
  private _paymentPlanCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999 })
  private _paymentPlanDescription: PropOrFactory<string> = () => this.chance.sentence()
  private _salesCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 99999 })
  private _salesTransactionCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999 })
  private _salesDescription: PropOrFactory<string> = () => this.chance.name()
  private _supervisorCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 99999 })
  private _supervisorDescription: PropOrFactory<string> = () => this.chance.name()
  private _totalWeight: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 99999 }).toString()
  private _valueServed: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 99999 }).toString()
  private _bonusValue: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 99999 }).toString()
  private _items: PropOrFactory<{ productCode: number }[]> = () => [
    { productCode: this.chance.integer({ min: 1000, max: 9999 }) },
    { productCode: this.chance.integer({ min: 1000, max: 9999 }) },
    { productCode: this.chance.integer({ min: 1000, max: 9999 }) },
  ]

  static aOrder(): OrderFakeBuilder {
    return new OrderFakeBuilder()
  }

  static theOrder(countObjs: number) {
    return new OrderFakeBuilder(countObjs)
  }

  build(): TBuild {
    const orders = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new OrderEntity({
          amount: this.callFactory(this._amount, index),
          billingDate: this.callFactory(this._billingDate, index),
          branchCode: this.callFactory(this._branchCode, index),
          bonusValue: this.callFactory(this._bonusValue, index),
          customerCode: this.callFactory(this._customerCode, index),
          date: this.callFactory(this._date, index),
          deliveryDate: this.callFactory(this._deliveryDate, index),
          items: this.callFactory(this._items, index),
          loadCode: this.callFactory(this._loadCode, index),
          mediumTerm: this.callFactory(this._mediumTerm, index),
          middleOrder: this.callFactory(this._middleOrder, index),
          noteCode: this.callFactory(this._noteCode, index),
          orderCode: this.callFactory(this._orderCode, index),
          paymentPlanCode: this.callFactory(this._paymentPlanCode, index),
          paymentPlanDescription: this.callFactory(this._paymentPlanDescription, index),
          position: this.callFactory(this._position, index),
          quantityItems: this.callFactory(this._quantityItems, index),
          salesCode: this.callFactory(this._salesCode, index),
          salesDescription: this.callFactory(this._salesDescription, index),
          salesTransactionCode: this.callFactory(this._salesTransactionCode, index),
          supervisorCode: this.callFactory(this._supervisorCode, index),
          supervisorDescription: this.callFactory(this._supervisorDescription, index),
          totalWeight: this.callFactory(this._totalWeight, index),
          valueServed: this.callFactory(this._valueServed, index),
        }),
    )

    return this.countObjs === 1 ? (orders[0] as any) : orders
  }

  withCustomerCode(customerCode: PropOrFactory<number>): OrderFakeBuilder {
    this._customerCode = customerCode
    return this
  }

  withAmount(amount: PropOrFactory<string>): OrderFakeBuilder {
    this._amount = amount
    return this
  }

  withLoadCode(loadCode: PropOrFactory<number>): OrderFakeBuilder {
    this._loadCode = loadCode
    return this
  }

  withOrderCode(orderCode: PropOrFactory<number>): OrderFakeBuilder {
    this._orderCode = orderCode
    return this
  }

  withNoteCode(noteCode: PropOrFactory<number>): OrderFakeBuilder {
    this._noteCode = noteCode
    return this
  }

  withBillingDate(billingDate: PropOrFactory<Date>): OrderFakeBuilder {
    this._billingDate = billingDate
    return this
  }

  withDeliveryDate(deliveryDate: PropOrFactory<Date>): OrderFakeBuilder {
    this._deliveryDate = deliveryDate
    return this
  }

  withPosition(position: PropOrFactory<string>): OrderFakeBuilder {
    this._position = position
    return this
  }

  withDate(date: PropOrFactory<Date>): OrderFakeBuilder {
    this._date = date
    return this
  }

  withBranchCode(branchCode: PropOrFactory<number>): OrderFakeBuilder {
    this._branchCode = branchCode
    return this
  }

  withMediumTerm(mediumTerm: PropOrFactory<number>): OrderFakeBuilder {
    this._mediumTerm = mediumTerm
    return this
  }

  withQuantityItems(quantityItems: PropOrFactory<number>): OrderFakeBuilder {
    this._quantityItems = quantityItems
    return this
  }

  withMiddleOrder(middleOrder: PropOrFactory<string>): OrderFakeBuilder {
    this._middleOrder = middleOrder
    return this
  }

  withPaymentPlanCode(paymentPlanCode: PropOrFactory<number>): OrderFakeBuilder {
    this._paymentPlanCode = paymentPlanCode
    return this
  }

  withPaymentPlanDescription(paymentPlanDescription: PropOrFactory<string>): OrderFakeBuilder {
    this._paymentPlanDescription = paymentPlanDescription
    return this
  }

  withSalesCode(salesCode: PropOrFactory<number>): OrderFakeBuilder {
    this._salesCode = salesCode
    return this
  }

  withSalesTransactionCode(salesTransactionCode: PropOrFactory<number>): OrderFakeBuilder {
    this._salesTransactionCode = salesTransactionCode
    return this
  }

  withSalesDescription(salesDescription: PropOrFactory<string>): OrderFakeBuilder {
    this._salesDescription = salesDescription
    return this
  }

  withSupervisorCode(supervisorCode: PropOrFactory<number>): OrderFakeBuilder {
    this._supervisorCode = supervisorCode
    return this
  }

  withSupervisorDescription(supervisorDescription: PropOrFactory<string>): OrderFakeBuilder {
    this._supervisorDescription = supervisorDescription
    return this
  }

  withTotalWeight(totalWeight: PropOrFactory<string>): OrderFakeBuilder {
    this._totalWeight = totalWeight
    return this
  }

  withValueServed(valueServed: PropOrFactory<string>): OrderFakeBuilder {
    this._valueServed = valueServed
    return this
  }

  withBonusValue(bonusValue: PropOrFactory<string>): OrderFakeBuilder {
    this._bonusValue = bonusValue
    return this
  }

  withItems(items: PropOrFactory<{ productCode: number }[]>): OrderFakeBuilder {
    this._items = items
    return this
  }

  get customerCode(): number {
    return this.getValue('customerCode')
  }

  get amount(): string {
    return this.getValue('amount')
  }

  get loadCode(): number {
    return this.getValue('loadCode')
  }

  get orderCode(): number {
    return this.getValue('orderCode')
  }

  get noteCode(): number {
    return this.getValue('noteCode')
  }

  get billingDate(): Date {
    return this.getValue('billingDate')
  }

  get deliveryDate(): Date {
    return this.getValue('deliveryDate')
  }

  get position(): string {
    return this.getValue('position')
  }

  get date(): Date {
    return this.getValue('date')
  }

  get branchCode(): number {
    return this.getValue('branchCode')
  }

  get mediumTerm(): number {
    return this.getValue('mediumTerm')
  }

  get quantityItems(): number {
    return this.getValue('quantityItems')
  }

  get middleOrder(): string {
    return this.getValue('middleOrder')
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

  get salesTransactionCode(): number {
    return this.getValue('salesTransactionCode')
  }

  get salesDescription(): string {
    return this.getValue('salesDescription')
  }

  get supervisorCode(): number {
    return this.getValue('supervisorCode')
  }

  get supervisorDescription(): string {
    return this.getValue('supervisorDescription')
  }

  get totalWeight(): string {
    return this.getValue('totalWeight')
  }

  get valueServed(): string {
    return this.getValue('valueServed')
  }

  get bonusValue(): string {
    return this.getValue('bonusValue')
  }

  get items(): { productCode: number }[] {
    return this.getValue('items')
  }
}
