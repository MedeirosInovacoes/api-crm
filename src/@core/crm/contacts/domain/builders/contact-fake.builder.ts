import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'

export class ContactFakeBuilder<TBuild = any> extends FakeBuilder {
  private _name: PropOrFactory<string> = () => this.chance.name()
  private _customerCode: PropOrFactory<number> = () => this.chance.integer({ min: 1000, max: 9999 })
  private _customerPrimaryCode: PropOrFactory<number> = () =>
    this.chance.integer({ min: 1000, max: 9999 })
  private _invalidEmail?: PropOrFactory<string> = () => this.chance.email()
  private _companyId?: PropOrFactory<string> = () =>
    this.chance.integer({ min: 1000, max: 9999 }).toString()
  private _email?: PropOrFactory<string> = () => this.chance.email()
  private _associatedEmail?: PropOrFactory<string> = () => this.chance.email()
  private _phone?: PropOrFactory<string> = () => this.chance.phone()
  private _createdAt?: PropOrFactory<Date> = () => this.chance.date()
  private _updatedAt?: PropOrFactory<Date> = () => this.chance.date()

  optional: string[] = [
    'invalidEmail',
    'companyId',
    'email',
    'associatedEmail',
    'phone',
    'createdAt',
    'updatedAt',
  ]

  static aContact(): ContactFakeBuilder {
    return new ContactFakeBuilder()
  }

  static theContact(countObjs: number) {
    return new ContactFakeBuilder(countObjs)
  }

  build(): TBuild {
    const contacts = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new ContactEntity({
          name: this.callFactory(this._name, index),
          customerCode: this.callFactory(this._customerCode, index),
          customerPrimaryCode: this.callFactory(this._customerPrimaryCode, index),
          invalidEmail: this.callFactory(this._invalidEmail, index),
          companyId: this.callFactory(this._companyId, index),
          email: this.callFactory(this._email, index),
          associatedEmail: this.callFactory(this._associatedEmail, index),
          phone: this.callFactory(this._phone, index),
          createdAt: this.callFactory(this._createdAt, index),
          updatedAt: this.callFactory(this._updatedAt, index),
        }),
    )

    // @ts-ignore
    return this.countObjs === 1 ? (contacts[0] as any) : contacts
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    return this.setValue('name', valueOrFactory)
  }

  withCustomerCode(valueOrFactory: PropOrFactory<number>) {
    return this.setValue('customerCode', valueOrFactory)
  }

  withCustomerPrimaryCode(valueOrFactory: PropOrFactory<number>) {
    return this.setValue('customerPrimaryCode', valueOrFactory)
  }

  withInvalidEmail(valueOrFactory: PropOrFactory<string>) {
    return this.setValue('invalidEmail', valueOrFactory)
  }

  withCompanyId(valueOrFactory: PropOrFactory<string>) {
    return this.setValue('companyId', valueOrFactory)
  }

  withEmail(valueOrFactory: PropOrFactory<string>) {
    return this.setValue('email', valueOrFactory)
  }

  withAssociatedEmail(valueOrFactory: PropOrFactory<string>) {
    return this.setValue('associatedEmail', valueOrFactory)
  }

  withPhone(valueOrFactory: PropOrFactory<string>) {
    return this.setValue('phone', valueOrFactory)
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    return this.setValue('createdAt', valueOrFactory)
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    return this.setValue('updatedAt', valueOrFactory)
  }

  get name(): PropOrFactory<string> {
    return this.getValue('name')
  }

  get customerCode(): PropOrFactory<number> {
    return this.getValue('customerCode')
  }

  get customerPrimaryCode(): PropOrFactory<number> {
    return this.getValue('customerPrimaryCode')
  }

  get invalidEmail(): PropOrFactory<string> {
    return this.getValue('invalidEmail')
  }

  get companyId(): PropOrFactory<string> {
    return this.getValue('companyId')
  }

  get email(): PropOrFactory<string> {
    return this.getValue('email')
  }

  get associatedEmail(): PropOrFactory<string> {
    return this.getValue('associatedEmail')
  }

  get phone(): PropOrFactory<string> {
    return this.getValue('phone')
  }

  get createdAt(): PropOrFactory<Date> {
    return this.getValue('createdAt')
  }

  get updatedAt(): PropOrFactory<Date> {
    return this.getValue('updatedAt')
  }
}
