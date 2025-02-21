import { AggregateRoot } from '@/@core/@shared/domain/aggregate-root'
import { ProductToCrmMapper } from '@/@core/crm/products/application/mappers/product-to-crm/product-to-crm.mapper'

export type ProductConstructorProps = {
  productCode: number
  price?: number
  description?: string
  packaging?: string
  registrationDate?: Date
  unitQuantity?: number
  grossWeight?: number
  bonusValue?: number
  masterUnit?: string
  unit?: string
  sectionCode?: number
  section?: string
  departmentCode?: number
  department?: string
  supplierCode?: number
  supplier?: string
  createdAt?: Date
  updatedAt?: Date
}

export class ProductEntity extends AggregateRoot {
  private _id: string
  private _props: ProductConstructorProps = {} as ProductConstructorProps

  constructor(props: ProductConstructorProps, id?: string) {
    super()
    this._id = id
    this._props = props
  }

  static create(props: ProductConstructorProps, id?: string): ProductEntity {
    return new ProductEntity(props, id)
  }

  changePrice(price: number) {
    this._props.price = price
  }

  get id(): string {
    return this._id
  }

  get productCode(): number {
    return this._props.productCode
  }

  get price(): number {
    return this._props.price
  }

  get description(): string {
    return this._props.description
  }

  get packaging(): string {
    return this._props.packaging
  }

  get registrationDate(): Date {
    return this._props.registrationDate
  }

  get unitQuantity(): number {
    return this._props.unitQuantity
  }

  get grossWeight(): number {
    return this._props.grossWeight
  }

  get bonusValue(): number {
    return this._props.bonusValue
  }

  get masterUnit(): string {
    return this._props.masterUnit
  }

  get unit(): string {
    return this._props.unit
  }

  get sectionCode(): number {
    return this._props.sectionCode
  }

  get section(): string {
    return this._props.section
  }

  get departmentCode(): number {
    return this._props.departmentCode
  }

  get department(): string {
    return this._props.department
  }

  get supplierCode(): number {
    return this._props.supplierCode
  }

  get supplier(): string {
    return this._props.supplier
  }

  toJSON(): ProductConstructorProps {
    return this._props
  }

  toCrm() {
    return ProductToCrmMapper.map(this)
  }
}
