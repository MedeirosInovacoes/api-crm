import { AggregateRoot } from '@/@core/@shared/domain/aggregate-root'

export type OrderConstructorProps = {
  customerCode: number
  amount: string
  loadCode: number
  orderCode: number
  noteCode: number
  billingDate: Date
  deliveryDate: Date
  position: string
  date: Date
  branchCode: number
  mediumTerm: number
  quantityItems: number
  middleOrder: string
  paymentPlanCode: number
  paymentPlanDescription: string
  salesCode: number
  salesTransactionCode: number
  salesDescription: string
  supervisorCode: number
  supervisorDescription: string
  totalWeight: string
  valueServed: number
  bonusValue: string
  items: {
    productCode: number
  }[]
}

export class OrderEntity extends AggregateRoot {
  private _id: string
  private _props: OrderConstructorProps = {} as OrderConstructorProps

  constructor(props: OrderConstructorProps, id?: string) {
    super()
    this._props = props
    this._id = id
  }

  static create(props: OrderConstructorProps, id?: string): OrderEntity {
    return new OrderEntity(props, id)
  }

  get id(): string {
    return this._id
  }

  get customerCode(): number {
    return this._props.customerCode
  }

  get amount(): string {
    return this._props.amount
  }

  get loadCode(): number {
    return this._props.loadCode
  }

  get orderCode(): number {
    return this._props.orderCode
  }

  get noteCode(): number {
    return this._props.noteCode
  }

  get billingDate(): Date {
    return this._props.billingDate
  }

  get deliveryDate(): Date {
    return this._props.deliveryDate
  }

  get position(): string {
    return this._props.position
  }

  get date(): Date {
    return this._props.date
  }

  get branchCode(): number {
    return this._props.branchCode
  }

  get mediumTerm(): number {
    return this._props.mediumTerm
  }

  get quantityItems(): number {
    return this._props.quantityItems
  }

  get middleOrder(): string {
    return this._props.middleOrder
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

  get salesTransactionCode(): number {
    return this._props.salesTransactionCode
  }

  get salesDescription(): string {
    return this._props.salesDescription
  }

  get supervisorCode(): number {
    return this._props.supervisorCode
  }

  get supervisorDescription(): string {
    return this._props.supervisorDescription
  }

  get totalWeight(): string {
    return this._props.totalWeight
  }

  get valueServed(): number {
    return this._props.valueServed
  }

  get bonusValue(): string {
    return this._props.bonusValue
  }

  get items(): { productCode: number }[] {
    return this._props.items
  }

  toJSON(): { id: string } & OrderConstructorProps {
    return {
      id: this.id,
      ...this._props,
    }
  }
}
