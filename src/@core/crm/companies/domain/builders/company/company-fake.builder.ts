import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

export class CompanyFakeBuilder<TBuild = any> extends FakeBuilder {
  private _id: PropOrFactory<string> = () =>
    this.faker.number.int({ min: 1000, max: 99999 }).toString()
  private _active?: PropOrFactory<string> = () => this.faker.helpers.arrayElement(['S', 'N'])
  private _activityCode: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _activityDescription: PropOrFactory<string> = () => this.faker.lorem.text()
  private _channelDescription: PropOrFactory<string> = () => this.faker.lorem.text()
  private _address: PropOrFactory<string> = () => this.faker.location.streetAddress()
  private _availableLimit: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _averageTermMonthly?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _averageTicketMonthly?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _billingBranchCode: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _billingBranchDescription: PropOrFactory<string> = () => this.faker.lorem.text()
  private _blocked: PropOrFactory<boolean> = () => this.faker.datatype.boolean()
  private _city: PropOrFactory<string> = () => this.faker.location.city()
  private _classification: PropOrFactory<string> = () =>
    this.faker.helpers.arrayElement(['A', 'B', 'C', 'D'])
  private _client: PropOrFactory<string> = () => this.faker.person.fullName()
  private _cnpj: PropOrFactory<string> = () =>
    this.faker.helpers.replaceSymbols('##.###.###/####-##')
  private _complement: PropOrFactory<string> = () => this.faker.location.secondaryAddress()
  private _cpf: PropOrFactory<string> = () => this.faker.helpers.replaceSymbols('###.###.###-##')
  private _customerCode: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _customerPrimaryCode: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _dateLastPurchase: PropOrFactory<Date> = () => this.faker.date.recent()
  private _district: PropOrFactory<string> = () => this.faker.location.county()
  private _emailNfe: PropOrFactory<string> = () => this.faker.internet.email()
  private _kindPerson: PropOrFactory<string> = () => this.faker.helpers.arrayElement(['F', 'J'])
  private _limit: PropOrFactory<number> = () => this.faker.number.int({ min: 1000, max: 9999 })
  private _name: PropOrFactory<string> = () => this.faker.person.fullName()
  private _salesCode: PropOrFactory<number> = () => this.faker.number.int({ min: 1000, max: 9999 })
  private _networkCode: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _networkDescription: PropOrFactory<string> = () => this.faker.lorem.text()
  private _originLead?: PropOrFactory<string> = () => 'Winthor'
  private _squareCode: PropOrFactory<number> = () => this.faker.number.int({ min: 1000, max: 9999 })
  private _squareDescription: PropOrFactory<string> = () => this.faker.lorem.text()
  private _state: PropOrFactory<string> = () => this.faker.location.state()
  private _stateRegistration: PropOrFactory<string> = () => this.faker.lorem.text()
  private _website: PropOrFactory<string> = () => this.faker.internet.url()
  private _winthorRegistrationDate: PropOrFactory<Date> = () => this.faker.date.recent()
  private _zipCode: PropOrFactory<string> = () => this.faker.location.zipCode()
  private _createdAt?: PropOrFactory<Date> = () => this.faker.date.recent()
  private _updatedAt?: PropOrFactory<Date> = () => this.faker.date.recent()
  private _deals?: PropOrFactory<DealEntity[]> = () => DealFakeBuilder.theDeals(3).build()

  optional: string[] = [
    'active',
    'averageTermMonthly',
    'averageTicketMonthly',
    'originLead',
    'createdAt',
    'updatedAt',
    'deals',
  ]

  static aCompany(): CompanyFakeBuilder {
    return new CompanyFakeBuilder()
  }

  static theCompany(countObjs: number) {
    return new CompanyFakeBuilder(countObjs)
  }

  build(): TBuild {
    const companies = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new CompanyEntity(
          {
            active: this.callFactory(this._active, index),
            activityCode: this.callFactory(this._activityCode, index),
            activityDescription: this.callFactory(this._activityDescription, index),
            channelDescription: this.callFactory(this._channelDescription, index),
            address: this.callFactory(this._address, index),
            availableLimit: this.callFactory(this._availableLimit, index),
            averageTermMonthly: this.callFactory(this._averageTermMonthly, index),
            averageTicketMonthly: this.callFactory(this._averageTicketMonthly, index),
            billingBranchCode: this.callFactory(this._billingBranchCode, index),
            billingBranchDescription: this.callFactory(this._billingBranchDescription, index),
            blocked: this.callFactory(this._blocked, index),
            city: this.callFactory(this._city, index),
            classification: this.callFactory(this._classification, index),
            client: this.callFactory(this._client, index),
            cnpj: this.callFactory(this._cnpj, index),
            complement: this.callFactory(this._complement, index),
            cpf: this.callFactory(this._cpf, index),
            customerCode: this.callFactory(this._customerCode, index),
            customerPrimaryCode: this.callFactory(this._customerPrimaryCode, index),
            dateLastPurchase: this.callFactory(this._dateLastPurchase, index),
            district: this.callFactory(this._district, index),
            emailNfe: this.callFactory(this._emailNfe, index),
            kindPerson: this.callFactory(this._kindPerson, index),
            limit: this.callFactory(this._limit, index),
            name: this.callFactory(this._name, index),
            salesCode: this.callFactory(this._salesCode, index),
            networkCode: this.callFactory(this._networkCode, index),
            networkDescription: this.callFactory(this._networkDescription, index),
            originLead: this.callFactory(this._originLead, index),
            squareCode: this.callFactory(this._squareCode, index),
            squareDescription: this.callFactory(this._squareDescription, index),
            state: this.callFactory(this._state, index),
            stateRegistration: this.callFactory(this._stateRegistration, index),
            website: this.callFactory(this._website, index),
            winthorRegistrationDate: this.callFactory(this._winthorRegistrationDate, index),
            zipCode: this.callFactory(this._zipCode, index),
            createdAt: this.callFactory(this._createdAt, index),
            updatedAt: this.callFactory(this._updatedAt, index),
            deals: this.callFactory(this._deals, index),
          },
          this.callFactory(this._id, index),
        ),
    )

    // @ts-ignore
    return this.countObjs === 1 ? (companies[0] as any) : companies
  }

  withId(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('id', valueOrFactory)
  }

  withActive(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('active', valueOrFactory)
  }

  withActivityCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('activityCode', valueOrFactory)
  }

  withActivityDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('activityDescription', valueOrFactory)
  }

  withChannelDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('channelDescription', valueOrFactory)
  }

  withAddress(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('address', valueOrFactory)
  }

  withAvailableLimit(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('availableLimit', valueOrFactory)
  }

  withAverageTermMonthly(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('averageTermMonthly', valueOrFactory)
  }

  withAverageTicketMonthly(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('averageTicketMonthly', valueOrFactory)
  }

  withBillingBranchCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('billingBranchCode', valueOrFactory)
  }

  withBillingBranchDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('billingBranchDescription', valueOrFactory)
  }

  withBlocked(valueOrFactory: PropOrFactory<boolean>): this {
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

  withCnpj(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('cnpj', valueOrFactory)
  }

  withComplement(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('complement', valueOrFactory)
  }

  withCpf(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('cpf', valueOrFactory)
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

  withSalesCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('salesCode', valueOrFactory)
  }

  withNetworkCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('networkCode', valueOrFactory)
  }

  withNetworkDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('networkDescription', valueOrFactory)
  }

  withOriginLead(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('originLead', valueOrFactory)
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

  withWinthorRegistrationDate(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('winthorRegistrationDate', valueOrFactory)
  }

  withZipCode(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('zipCode', valueOrFactory)
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('createdAt', valueOrFactory)
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('updatedAt', valueOrFactory)
  }

  withDeals(valueOrFactory: PropOrFactory<DealEntity[]>): this {
    return this.setValue('deals', valueOrFactory)
  }

  get id(): string {
    return this.getValue('id')
  }

  get active(): string {
    return this.getValue('active')
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

  get averageTermMonthly(): number {
    return this.getValue('averageTermMonthly')
  }

  get averageTicketMonthly(): number {
    return this.getValue('averageTicketMonthly')
  }

  get billingBranchCode(): number {
    return this.getValue('billingBranchCode')
  }

  get billingBranchDescription(): string {
    return this.getValue('billingBranchDescription')
  }

  get blocked(): boolean {
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

  get cnpj(): string {
    return this.getValue('cnpj')
  }

  get complement(): string {
    return this.getValue('complement')
  }

  get cpf(): string {
    return this.getValue('cpf')
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

  get salesCode(): number {
    return this.getValue('salesCode')
  }

  get networkCode(): number {
    return this.getValue('networkCode')
  }

  get networkDescription(): string {
    return this.getValue('networkDescription')
  }

  get originLead(): string {
    return this.getValue('originLead')
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

  get winthorRegistrationDate(): Date {
    return this.getValue('winthorRegistrationDate')
  }

  get zipCode(): string {
    return this.getValue('zipCode')
  }

  get createdAt(): Date {
    return this.getValue('createdAt')
  }

  get updatedAt(): Date {
    return this.getValue('updatedAt')
  }

  get deals(): DealEntity[] {
    return this.getValue('deals')
  }
}
