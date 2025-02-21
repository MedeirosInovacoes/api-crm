import { validateEmail } from '@/@core/@shared/application/utils/email/validate-email.util'
import { PhoneValidator } from '@/@core/@shared/application/utils/formaters/phone.validator'
import { ContactToCrmMapper } from '@/@core/crm/contacts/application/mappers/contact-to-crm/contact-to-crm.mapper'

export interface ContactProps {
  name: string
  customerCode: number
  customerPrimaryCode: number
  invalidEmail?: string
  companyId?: string
  email?: string
  associatedEmail?: string
  phone?: string
  createdAt?: Date
  updatedAt?: Date
}

export class ContactEntity {
  private _id: string
  private _props: ContactProps = {} as ContactProps

  constructor(props: ContactProps, id?: string) {
    this._props.name = props.name
    this._props.customerCode = props.customerCode
    this._props.customerPrimaryCode = props.customerPrimaryCode
    this._props.companyId = props.companyId ?? ''
    this._props.email = props.email ?? ''
    this._props.associatedEmail = props.associatedEmail ?? ''
    this._props.phone = props.phone ?? ''
    this._props.createdAt = props.createdAt ?? null
    this._props.updatedAt = props.updatedAt ?? null
    this._id = id

    const email = this._props.email?.replace(/\s/g, '').toLowerCase() ?? null
    const emailValidate = validateEmail(email || '')

    this._props.invalidEmail = this._props.invalidEmail || (email !== emailValidate ? email : '')
    this._props.email = this._props.invalidEmail ? '' : email
    this._props.phone = PhoneValidator.formatNumber(this._props.phone)
  }

  get id() {
    return this._id
  }

  get companyId() {
    return this._props.companyId
  }

  get name() {
    return this._props.name
  }

  get email() {
    return this._props.email
  }

  get associatedEmail() {
    return this._props.associatedEmail
  }

  get invalidEmail() {
    return this._props.invalidEmail
  }

  get phone() {
    return this._props.phone
  }

  get customerCode() {
    return this._props.customerCode
  }

  get customerPrimaryCode() {
    return this._props.customerPrimaryCode
  }

  get createdAt() {
    return this._props.createdAt
  }

  get updatedAt() {
    return this._props.updatedAt
  }

  changeEmail(email: string) {
    this._props.email = email
    this.validate()
  }

  changeAssociatedEmail(associatedEmail: string) {
    this._props.associatedEmail = associatedEmail
    this.validate()
  }

  toCrm() {
    return ContactToCrmMapper.toCrm(this)
  }

  validate(): boolean {
    if (this._props.name?.length === 0 || this._props.name === null) {
      throw new Error('First name is required')
    }
    if (this._props.customerCode === 0) {
      throw new Error('Customer code is required')
    }
    if (this._props.customerPrimaryCode === 0) {
      throw new Error('Customer primary code is required')
    }

    return true
  }
}
