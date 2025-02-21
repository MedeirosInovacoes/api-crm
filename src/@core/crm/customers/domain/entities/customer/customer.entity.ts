import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { subDays } from 'date-fns'

export interface CustomerEntityProps {
  customerCode: number
  customerPrimaryCode: number
  name: string
  cpfCnpj: string
  client: string
  kindPerson: string
  classification: string
  dateLastPurchase: Date
  registrationDate: Date
  stateRegistration: string
  emailNfe: string
  email: string
  blocked: string
  limit: number
  billingCode: string
  salesCode: number
  availableLimit: number
  website: string
  address: string
  district: string
  city: string
  complement: string
  state: string
  zipCode: string
  phone: string
  observation: string
  billingBranchCode: number
  billingBranchDescription: string
  networkCode: number
  networkDescription: string
  channelDescription: string
  activityCode: number
  activityDescription: string
  squareCode: number
  squareDescription: string
  reactivationDate: Date
  orders: OrderEntity[]
}

export class CustomerEntity {
  private _props: CustomerEntityProps

  constructor(props: CustomerEntityProps) {
    this._props = props
  }

  get customerCode(): number {
    return this._props.customerCode
  }
  get customerPrimaryCode(): number {
    return this._props.customerPrimaryCode
  }
  get name(): string {
    return this._props.name
  }
  get cpfCnpj(): string {
    return this._props.cpfCnpj
  }
  get client(): string {
    return this._props.client
  }
  get kindPerson(): string {
    return this._props.kindPerson
  }
  get classification(): string {
    return this._props.classification
  }
  get dateLastPurchase(): Date {
    return this._props.dateLastPurchase
  }
  get registrationDate(): Date {
    return this._props.registrationDate
  }
  get stateRegistration(): string {
    return this._props.stateRegistration
  }
  get emailNfe(): string {
    return this._props.emailNfe
  }
  get email(): string {
    return this._props.email
  }
  get blocked(): string {
    return this._props.blocked
  }
  get limit(): number {
    return this._props.limit
  }
  get billingCode(): string {
    return this._props.billingCode
  }
  get salesCode(): number {
    return this._props.salesCode
  }
  get availableLimit(): number {
    return this._props.availableLimit
  }
  get website(): string {
    return this._props.website
  }
  get address(): string {
    return this._props.address
  }
  get district(): string {
    return this._props.district
  }
  get city(): string {
    return this._props.city
  }
  get complement(): string {
    return this._props.complement
  }
  get state(): string {
    return this._props.state
  }
  get zipCode(): string {
    return this._props.zipCode
  }
  get phone(): string {
    return this._props.phone
  }
  get observation(): string {
    return this._props.observation
  }
  get billingBranchCode(): number {
    return this._props.billingBranchCode
  }
  get billingBranchDescription(): string {
    return this._props.billingBranchDescription
  }
  get networkCode(): number {
    return this._props.networkCode
  }
  get networkDescription(): string {
    return this._props.networkDescription
  }
  get channelDescription(): string {
    return this._props.channelDescription
  }
  get activityCode(): number {
    return this._props.activityCode
  }
  get activityDescription(): string {
    return this._props.activityDescription
  }
  get squareCode(): number {
    return this._props.squareCode
  }
  get squareDescription(): string {
    return this._props.squareDescription
  }
  get reactivationDate(): Date {
    return this._props.reactivationDate
  }
  get isActive(): boolean {
    return (this._props.dateLastPurchase ?? this._props.registrationDate <= subDays(new Date(), 90))
      ? true
      : false
  }
  get orders(): OrderEntity[] {
    return this._props.orders
  }

  toJson(): CustomerEntityProps {
    return {
      ...this._props,
    }
  }
}
