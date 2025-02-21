import { CompanyToCrmMapper } from '@/@core/crm/companies/application/mappers/company-to-crm/company-to-crm.mapper'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { subDays } from 'date-fns'

export interface CompanyEntityProps {
  active?: string
  activityCode: number
  activityDescription: string
  channelDescription: string
  address: string
  availableLimit: number
  averageTermMonthly?: number
  averageTicketMonthly?: number
  billingBranchCode: number
  billingBranchDescription: string
  blocked: boolean
  city: string
  classification: string
  client: string
  cnpj: string
  complement: string
  cpf: string
  customerCode: number
  customerPrimaryCode: number
  dateLastPurchase: Date
  district: string
  emailNfe: string
  kindPerson: string
  limit: number
  name: string
  salesCode: number
  networkCode: number
  networkDescription: string
  originLead?: string
  squareCode: number
  squareDescription: string
  state: string
  stateRegistration: string
  website: string
  winthorRegistrationDate: Date
  zipCode: string
  originalSource?: string
  originalInDepthSource1?: string
  originalInDepthSource2?: string
  createdAt?: Date
  updatedAt?: Date
  deals?: DealEntity[]
}

export class CompanyEntity {
  private _id?: string | null
  private _props: CompanyEntityProps

  constructor(props: CompanyEntityProps, id?: string) {
    this._id = id ?? null
    this._props = props
  }

  changeActive = (active: string): void => {
    this._props.active = active
  }

  get id(): string {
    return this._id as string
  }

  get customerCode(): number {
    return this._props.customerCode
  }

  get customerPrimaryCode(): number {
    return this._props.customerPrimaryCode
  }

  get cnpj(): string {
    return this._props.cnpj
  }

  get cpf(): string {
    return this._props.cpf
  }

  get name(): string {
    return this._props.name
  }

  get client(): string {
    return this._props.client
  }

  get kindPerson(): string {
    return this._props.kindPerson
  }

  get active(): string {
    return this._props.active
  }

  get averageTicketMonthly(): number {
    return this._props.averageTicketMonthly
  }

  get averageTermMonthly(): number {
    return this._props.averageTermMonthly
  }

  get classification(): string {
    return this._props.classification
  }

  get limit(): number {
    return this._props.limit
  }

  get availableLimit(): number {
    return this._props.availableLimit
  }

  get dateLastPurchase(): Date {
    return this._props.dateLastPurchase
  }

  get winthorRegistrationDate(): Date {
    return this._props.winthorRegistrationDate
  }

  get stateRegistration(): string {
    return this._props.stateRegistration
  }

  get emailNfe(): string {
    return this._props.emailNfe
  }

  get blocked(): boolean {
    return this._props.blocked
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

  get salesCode(): number {
    return this._props.salesCode
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

  get activityCode(): number {
    return this._props.activityCode
  }

  get activityDescription(): string {
    return this._props.activityDescription
  }

  get channelDescription(): string {
    return this._props.channelDescription
  }

  get squareCode(): number {
    return this._props.squareCode
  }

  get squareDescription(): string {
    return this._props.squareDescription
  }

  get originLead(): string {
    return this._props.originLead
  }

  get originalSource(): string {
    return this._props.originalSource
  }

  get originalInDepthSource1(): string {
    return this._props.originalInDepthSource1
  }

  get originalInDepthSource2(): string {
    return this._props.originalInDepthSource2
  }

  get createdAt(): Date {
    return this._props.createdAt
  }

  get updatedAt(): Date {
    return this._props.updatedAt
  }

  get deals(): DealEntity[] {
    return this._props.deals ?? []
  }

  toJson(): { id: string } & CompanyEntityProps {
    return {
      id: this.id,
      ...this._props,
    }
  }

  static createWithCustomer = (customer: CustomerEntity, id?: string): CompanyEntity => {
    return new CompanyEntity(
      {
        blocked: customer.blocked === 'S' ? true : false,
        winthorRegistrationDate: customer.registrationDate,
        cpf: customer.kindPerson === 'F' ? customer.cpfCnpj : null,
        cnpj: customer.kindPerson === 'J' ? customer.cpfCnpj : null,
        averageTermMonthly: 0,
        averageTicketMonthly: 0,
        active: customer.dateLastPurchase <= subDays(new Date(), 90) ? 'N' : 'S',
        originLead: customer.salesCode === 1 ? 'Ecommerce' : 'Winthor',
        website: customer.website,
        address: customer.address,
        district: customer.district,
        city: customer.city,
        complement: customer.complement,
        state: customer.state,
        zipCode: customer.zipCode,
        salesCode: customer.salesCode,
        billingBranchCode: customer.billingBranchCode,
        billingBranchDescription: customer.billingBranchDescription,
        networkCode: customer.networkCode,
        networkDescription: customer.networkDescription,
        activityCode: customer.activityCode,
        activityDescription: customer.activityDescription,
        squareCode: customer.squareCode,
        squareDescription: customer.squareDescription,
        stateRegistration: customer.stateRegistration,
        channelDescription: customer.channelDescription,
        emailNfe: customer.emailNfe,
        availableLimit: customer.availableLimit,
        classification: customer.classification,
        client: customer.client,
        customerPrimaryCode: customer.customerPrimaryCode,
        dateLastPurchase: customer.dateLastPurchase,
        limit: customer.limit,
        name: customer.name,
        customerCode: customer.customerCode,
        kindPerson: customer.kindPerson,
        deals: customer.orders?.map((order) =>
          DealEntity.create({
            companyId: id,
            customerCode: order.customerCode,
            amount: +order.amount,
            branchCode: order.branchCode,
            bonusValue: order.bonusValue,
            date: order.date,
            deliveryDate: order.deliveryDate,
            mediumTerm: order.mediumTerm,
            middleOrder: order.middleOrder,
            paymentPlanCode: order.paymentPlanCode,
            paymentPlanDescription: order.paymentPlanDescription,
            quantityItems: order.quantityItems,
            salesCode: order.salesCode,
            salesDescription: order.salesDescription,
            salesTransactionCode: order.salesTransactionCode,
            supervisorCode: order.supervisorCode,
            supervisorDescription: order.supervisorDescription,
            totalWeight: order.totalWeight,
            valueServed: order.valueServed,
            billingDate: order.billingDate,
            loadNumber: order.loadCode,
            noteNumber: order.noteCode,
            orderNumber: order.orderCode,
            limit: customer.limit,
            name: customer.name,
            pipelineId: null,
            stage: null,
          }),
        ),
      },
      id,
    )
  }

  toCreateCrm() {
    return CompanyToCrmMapper.toCrm(this)
  }
}
