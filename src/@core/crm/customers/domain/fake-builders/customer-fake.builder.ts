import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { OrderFakeBuilder } from '@/@core/crm/customers/domain/fake-builders/order-fake.builder'

export class CustomerFakeBuilder<TBuild = any> extends FakeBuilder {
  private _customerCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 999999 })
  private _customerPrimaryCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 999999 })
  private _name: PropOrFactory<string> = () => this.chance.name()
  private _cpfCnpj: PropOrFactory<string> = () => this.chance.cpf()
  private _client: PropOrFactory<string> = () => this.chance.name()
  private _kindPerson: PropOrFactory<string> = () => this.chance.pickone(['F', 'J'])
  private _classification: PropOrFactory<string> = () => this.chance.pickone(['A', 'B', 'C', 'D'])
  private _dateLastPurchase: PropOrFactory<Date> = () => this.chance.date()
  private _registrationDate: PropOrFactory<Date> = () => this.chance.date()
  private _stateRegistration: PropOrFactory<string> = () => this.chance.string()
  private _emailNfe: PropOrFactory<string> = () => this.chance.email()
  private _email: PropOrFactory<string> = () => this.chance.email()
  private _blocked: PropOrFactory<string> = () => this.chance.pickone(['S', 'N'])
  private _limit: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 999999 })
  private _billingCode: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1, max: 999999 }).toString()
  private _salesCode: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 999999 })
  private _availableLimit: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1, max: 999999 })
  private _website: PropOrFactory<string> = () => this.chance.url()
  private _address: PropOrFactory<string> = () => this.chance.address()
  private _district: PropOrFactory<string> = () => this.chance.city()
  private _city: PropOrFactory<string> = () => this.chance.city()
  private _complement: PropOrFactory<string> = () => this.chance.city()
  private _state: PropOrFactory<string> = () => this.chance.state()
  private _zipCode: PropOrFactory<string> = () => this.chance.zip()
  private _phone: PropOrFactory<string> = () => this.chance.phone()
  private _observation: PropOrFactory<string> = () => this.chance.sentence()
  private _billingBranchCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1, max: 999999 })
  private _billingBranchDescription: PropOrFactory<string> = () => this.chance.sentence()
  private _networkCode: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 999999 })
  private _networkDescription: PropOrFactory<string> = () => this.chance.sentence()
  private _activityCode: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 999999 })
  private _activityDescription: PropOrFactory<string> = () => this.chance.sentence()
  private _channelDescription: PropOrFactory<string> = () => this.chance.sentence()
  private _squareCode: PropOrFactory<number> = () => this.chance.integer({ min: 1, max: 999999 })
  private _squareDescription: PropOrFactory<string> = () => this.chance.sentence()
  private _reactivationDate: PropOrFactory<Date> = () => this.chance.date()
  private _orders: PropOrFactory<OrderFakeBuilder[]> = () => OrderFakeBuilder.theOrder(10).build()

  static aCustomer(): CustomerFakeBuilder {
    return new CustomerFakeBuilder()
  }

  static theCustomer(countObjs: number): CustomerFakeBuilder {
    return new CustomerFakeBuilder(countObjs)
  }

  build(): TBuild {
    const customers = Array(this.countObjs)
      .fill(undefined)
      .map(
        (_, index) =>
          new CustomerEntity({
            channelDescription: this.callFactory(this._channelDescription, index),
            activityCode: this.callFactory(this._activityCode, index),
            activityDescription: this.callFactory(this._activityDescription, index),
            address: this.callFactory(this._address, index),
            availableLimit: this.callFactory(this._availableLimit, index),
            billingBranchCode: this.callFactory(this._billingBranchCode, index),
            billingBranchDescription: this.callFactory(this._billingBranchDescription, index),
            billingCode: this.callFactory(this._billingCode, index),
            blocked: this.callFactory(this._blocked, index),
            city: this.callFactory(this._city, index),
            classification: this.callFactory(this._classification, index),
            client: this.callFactory(this._client, index),
            complement: this.callFactory(this._complement, index),
            cpfCnpj: this.callFactory(this._cpfCnpj, index),
            customerCode: this.callFactory(this._customerCode, index),
            customerPrimaryCode: this.callFactory(this._customerPrimaryCode, index),
            dateLastPurchase: this.callFactory(this._dateLastPurchase, index),
            district: this.callFactory(this._district, index),
            email: this.callFactory(this._email, index),
            emailNfe: this.callFactory(this._emailNfe, index),
            kindPerson: this.callFactory(this._kindPerson, index),
            limit: this.callFactory(this._limit, index),
            name: this.callFactory(this._name, index),
            networkCode: this.callFactory(this._networkCode, index),
            networkDescription: this.callFactory(this._networkDescription, index),
            observation: this.callFactory(this._observation, index),
            orders: this.callFactory(this._orders, index),
            phone: this.callFactory(this._phone, index),
            registrationDate: this.callFactory(this._registrationDate, index),
            reactivationDate: this.callFactory(this._reactivationDate, index),
            salesCode: this.callFactory(this._salesCode, index),
            squareCode: this.callFactory(this._squareCode, index),
            squareDescription: this.callFactory(this._squareDescription, index),
            state: this.callFactory(this._state, index),
            stateRegistration: this.callFactory(this._stateRegistration, index),
            website: this.callFactory(this._website, index),
            zipCode: this.callFactory(this._zipCode, index),
          }),
      )

    // @ts-ignore
    return this.countObjs === 1 ? (customers[0] as any) : customers
  }

  get channelDescription(): string {
    return this.getValue('channelDescription')
  }

  get activityCode(): number {
    return this.getValue('activityCode')
  }

  get activityDescription(): string {
    return this.getValue('activityDescription')
  }

  get address(): string {
    return this.getValue('address')
  }

  get availableLimit(): number {
    return this.getValue('availableLimit')
  }

  get billingBranchCode(): number {
    return this.getValue('billingBranchCode')
  }

  get billingBranchDescription(): string {
    return this.getValue('billingBranchDescription')
  }

  get billingCode(): string {
    return this.getValue('billingCode')
  }

  get blocked(): string {
    return this.getValue('blocked')
  }

  get city(): string {
    return this.getValue('city')
  }

  get classification(): string {
    return this.getValue('classification')
  }

  get client(): string {
    return this.getValue('client')
  }

  get complement(): string {
    return this.getValue('complement')
  }

  get cpfCnpj(): string {
    return this.getValue('cpfCnpj')
  }

  get customerCode(): number {
    return this.getValue('customerCode')
  }

  get customerPrimaryCode(): number {
    return this.getValue('customerPrimaryCode')
  }

  get dateLastPurchase(): Date {
    return this.getValue('dateLastPurchase')
  }

  get district(): string {
    return this.getValue('district')
  }

  get email(): string {
    return this.getValue('email')
  }

  get emailNfe(): string {
    return this.getValue('emailNfe')
  }

  get kindPerson(): string {
    return this.getValue('kindPerson')
  }

  get limit(): number {
    return this.getValue('limit')
  }

  get name(): string {
    return this.getValue('name')
  }

  get networkCode(): number {
    return this.getValue('networkCode')
  }

  get networkDescription(): string {
    return this.getValue('networkDescription')
  }

  get observation(): string {
    return this.getValue('observation')
  }

  get orders(): OrderFakeBuilder[] {
    return this.getValue('orders')
  }

  get phone(): string {
    return this.getValue('phone')
  }

  get registrationDate(): Date {
    return this.getValue('registrationDate')
  }

  get reactivationDate(): Date {
    return this.getValue('reactivationDate')
  }

  get salesCode(): number {
    return this.getValue('salesCode')
  }

  get squareCode(): number {
    return this.getValue('squareCode')
  }

  get squareDescription(): string {
    return this.getValue('squareDescription')
  }

  get state(): string {
    return this.getValue('state')
  }

  get stateRegistration(): string {
    return this.getValue('stateRegistration')
  }

  get website(): string {
    return this.getValue('website')
  }

  get zipCode(): string {
    return this.getValue('zipCode')
  }

  withActivityCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('activityCode', valueOrFactory)
  }

  withActivityDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('activityDescription', valueOrFactory)
  }

  withAddress(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('address', valueOrFactory)
  }

  withAvailableLimit(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('availableLimit', valueOrFactory)
  }

  withBillingBranchCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('billingBranchCode', valueOrFactory)
  }

  withBillingBranchDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('billingBranchDescription', valueOrFactory)
  }

  withBillingCode(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('billingCode', valueOrFactory)
  }

  withBlocked(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('blocked', valueOrFactory)
  }

  withCity(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('city', valueOrFactory)
  }

  withClassification(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('classification', valueOrFactory)
  }

  withClient(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('client', valueOrFactory)
  }

  withComplement(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('complement', valueOrFactory)
  }

  withCpfCnpj(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('cpfCnpj', valueOrFactory)
  }

  withCustomerCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('customerCode', valueOrFactory)
  }

  withCustomerPrimaryCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('customerPrimaryCode', valueOrFactory)
  }

  withDateLastPurchase(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('dateLastPurchase', valueOrFactory)
  }

  withDistrict(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('district', valueOrFactory)
  }

  withEmail(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('email', valueOrFactory)
  }

  withEmailNfe(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('emailNfe', valueOrFactory)
  }

  withKindPerson(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('kindPerson', valueOrFactory)
  }

  withLimit(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('limit', valueOrFactory)
  }

  withName(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('name', valueOrFactory)
  }

  withNetworkCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('networkCode', valueOrFactory)
  }

  withNetworkDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('networkDescription', valueOrFactory)
  }

  withObservation(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('observation', valueOrFactory)
  }

  withOrders(valueOrFactory: PropOrFactory<OrderFakeBuilder[]>): this {
    return this.setValue('orders', valueOrFactory)
  }

  withPhone(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('phone', valueOrFactory)
  }

  withRegistrationDate(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('registrationDate', valueOrFactory)
  }

  withReactivationDate(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('reactivationDate', valueOrFactory)
  }

  withSalesCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('salesCode', valueOrFactory)
  }

  withSquareCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('squareCode', valueOrFactory)
  }

  withSquareDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('squareDescription', valueOrFactory)
  }

  withState(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('state', valueOrFactory)
  }

  withStateRegistration(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('stateRegistration', valueOrFactory)
  }

  withWebsite(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('website', valueOrFactory)
  }

  withZipCode(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('zipCode', valueOrFactory)
  }

  withChannelDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('channelDescription', valueOrFactory)
  }
}
