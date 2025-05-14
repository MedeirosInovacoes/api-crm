import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export class ProductFakeBuilder<TBuild = ProductEntity> extends FakeBuilder {
  private _id: PropOrFactory<string> = () => this.faker.string.uuid()
  private _productCode: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _price?: PropOrFactory<number> = () => this.faker.number.int({ min: 1000, max: 9999 })
  private _description?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _packaging?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _registrationDate?: PropOrFactory<Date> = () => this.faker.date.recent()
  private _unitQuantity?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _grossWeight?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _bonusValue?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _masterUnit?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _unit?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _sectionCode?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _section?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _departmentCode?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _department?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _supplierCode?: PropOrFactory<number> = () =>
    this.faker.number.int({ min: 1000, max: 9999 })
  private _supplier?: PropOrFactory<string> = () => this.faker.lorem.word()
  private _createdAt?: PropOrFactory<Date> = () => this.faker.date.recent()
  private _updatedAt?: PropOrFactory<Date> = () => this.faker.date.recent()

  optional: string[] = [
    'price',
    'description',
    'packaging',
    'registrationDate',
    'unitQuantity',
    'grossWeight',
    'bonusValue',
    'masterUnit',
    'unit',
    'sectionCode',
    'section',
    'departmentCode',
    'department',
    'supplierCode',
    'supplier',
    'createdAt',
    'updatedAt',
  ]

  static aProduct(): ProductFakeBuilder {
    return new ProductFakeBuilder<ProductEntity>()
  }

  static theProducts(countObjs: number) {
    return new ProductFakeBuilder<ProductEntity[]>(countObjs)
  }

  build(): TBuild {
    const products = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new ProductEntity(
          {
            productCode: this.callFactory(this._productCode, index),
            price: this.callFactory(this._price, index),
            description: this.callFactory(this._description, index),
            packaging: this.callFactory(this._packaging, index),
            registrationDate: this.callFactory(this._registrationDate, index),
            unitQuantity: this.callFactory(this._unitQuantity, index),
            grossWeight: this.callFactory(this._grossWeight, index),
            bonusValue: this.callFactory(this._bonusValue, index),
            masterUnit: this.callFactory(this._masterUnit, index),
            unit: this.callFactory(this._unit, index),
            sectionCode: this.callFactory(this._sectionCode, index),
            section: this.callFactory(this._section, index),
            departmentCode: this.callFactory(this._departmentCode, index),
            department: this.callFactory(this._department, index),
            supplierCode: this.callFactory(this._supplierCode, index),
            supplier: this.callFactory(this._supplier, index),
            createdAt: this.callFactory(this._createdAt, index),
            updatedAt: this.callFactory(this._updatedAt, index),
          },
          this.callFactory(this._id, index),
        ),
    )

    // @ts-ignore
    return this.countObjs === 1 ? (products[0] as any) : products
  }

  withId(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('id', valueOrFactory)
  }

  withProductCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('productCode', valueOrFactory)
  }

  withPrice(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('price', valueOrFactory)
  }

  withDescription(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('description', valueOrFactory)
  }

  withPackaging(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('packaging', valueOrFactory)
  }

  withRegistrationDate(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('registrationDate', valueOrFactory)
  }

  withUnitQuantity(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('unitQuantity', valueOrFactory)
  }

  withGrossWeight(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('grossWeight', valueOrFactory)
  }

  withBonusValue(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('bonusValue', valueOrFactory)
  }

  withMasterUnit(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('masterUnit', valueOrFactory)
  }

  withUnit(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('unit', valueOrFactory)
  }

  withSectionCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('sectionCode', valueOrFactory)
  }

  withSection(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('section', valueOrFactory)
  }

  withDepartmentCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('departmentCode', valueOrFactory)
  }

  withDepartment(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('department', valueOrFactory)
  }

  withSupplierCode(valueOrFactory: PropOrFactory<number>): this {
    return this.setValue('supplierCode', valueOrFactory)
  }

  withSupplier(valueOrFactory: PropOrFactory<string>): this {
    return this.setValue('supplier', valueOrFactory)
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('createdAt', valueOrFactory)
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>): this {
    return this.setValue('updatedAt', valueOrFactory)
  }

  get id(): PropOrFactory<string> {
    return this.getValue('id')
  }

  get productCode(): PropOrFactory<number> {
    return this.getValue('productCode')
  }

  get price(): PropOrFactory<number> | undefined {
    return this.getValue('price')
  }

  get description(): PropOrFactory<string> | undefined {
    return this.getValue('description')
  }

  get packaging(): PropOrFactory<string> | undefined {
    return this.getValue('packaging')
  }

  get registrationDate(): PropOrFactory<Date> | undefined {
    return this.getValue('registrationDate')
  }

  get unitQuantity(): PropOrFactory<number> | undefined {
    return this.getValue('unitQuantity')
  }

  get grossWeight(): PropOrFactory<number> | undefined {
    return this.getValue('grossWeight')
  }

  get bonusValue(): PropOrFactory<number> | undefined {
    return this.getValue('bonusValue')
  }

  get masterUnit(): PropOrFactory<string> | undefined {
    return this.getValue('masterUnit')
  }

  get unit(): PropOrFactory<string> | undefined {
    return this.getValue('unit')
  }

  get sectionCode(): PropOrFactory<number> | undefined {
    return this.getValue('sectionCode')
  }

  get section(): PropOrFactory<string> | undefined {
    return this.getValue('section')
  }

  get departmentCode(): PropOrFactory<number> | undefined {
    return this.getValue('departmentCode')
  }

  get department(): PropOrFactory<string> | undefined {
    return this.getValue('department')
  }

  get supplierCode(): PropOrFactory<number> | undefined {
    return this.getValue('supplierCode')
  }

  get supplier(): PropOrFactory<string> | undefined {
    return this.getValue('supplier')
  }

  get createdAt(): PropOrFactory<Date> | undefined {
    return this.getValue('createdAt')
  }

  get updatedAt(): PropOrFactory<Date> | undefined {
    return this.getValue('updatedAt')
  }
}

export const aProduct = ProductFakeBuilder.aProduct
export const theProducts = ProductFakeBuilder.theProducts
