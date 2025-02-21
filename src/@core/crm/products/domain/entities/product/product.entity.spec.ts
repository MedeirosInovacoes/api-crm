import {
  ProductConstructorProps,
  ProductEntity,
} from '@/@core/crm/products/domain/entities/product/product.entity'

const productObject: ProductConstructorProps = {
  bonusValue: 232,
  department: 'department',
  departmentCode: 22,
  description: 'description',
  grossWeight: 22,
  masterUnit: 'masterUnit',
  packaging: 'packaging',
  price: 22,
  productCode: 22,
  registrationDate: new Date(),
  section: 'section',
  sectionCode: 22,
  supplier: 'supplier',
  supplierCode: 22,
  unit: 'unit',
  unitQuantity: 22,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('ProductEntity unit tests', () => {
  it('Deve criar uma entidade de produto com construtor', () => {
    const product = new ProductEntity(productObject, '2312')

    expect(product).toBeDefined()
    expect(product.id).toBe('2312')
    expect(product.toJSON()).toEqual(productObject)
  })

  it('Deve criar uma entidade de produto com método estático create', () => {
    const product = ProductEntity.create(productObject)

    expect(product).toBeDefined()
    expect(product.id).toBeUndefined()
    expect(product.toJSON()).toEqual(productObject)
  })

  it('Deve retornar um objeto no formato para o crm', () => {
    const product = ProductEntity.create(productObject)
    const crmProduct = product.toCrm()
    expect(crmProduct).toEqual({
      bonus_value: '232',
      department: 'department',
      department_code: '22',
      description: 'description',
      gross_weight: '22',
      master_unit: 'masterUnit',
      name: 'description',
      packaging: 'packaging',
      price: '22',
      product_code: '22',
      registration_date: productObject.registrationDate.toISOString(),
      section: 'section',
      section_code: '22',
      supplier: 'supplier',
      supplier_code: '22',
      unit: 'unit',
      unit_quantity: '22',
    })
  })
})
