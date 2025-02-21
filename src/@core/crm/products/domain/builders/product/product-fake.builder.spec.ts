import {
  aProduct,
  ProductFakeBuilder,
  theProducts,
} from '@/@core/crm/products/domain/builders/product/product-fake.builder'

describe('ProductFakeBuilder unit tests', () => {
  describe('id prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_id']).toBe('function')
    })

    it('withId', () => {
      const faker = aProduct().withId('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.id).toBe('123')

      faker.withId(() => '123')
      expect(typeof faker['_id']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_id']()).toBe('123')
      expect(faker.id).toBe('123')
    })

    it('should pass index to id factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withId(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('productCode prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_productCode']).toBe('function')
    })

    it('withProductCode', () => {
      const faker = aProduct().withProductCode(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.productCode).toBe(123)

      faker.withProductCode(() => 123)
      expect(typeof faker['_productCode']).toBe('function')
      //@ts-expect-error _productCode is a callable
      expect(faker['_productCode']()).toBe(123)
      expect(faker.productCode).toBe(123)
    })

    it('should pass index to productCode factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withProductCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('price prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_price']).toBe('function')
    })

    it('withPrice', () => {
      const faker = aProduct().withPrice(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.price).toBe(123)

      faker.withPrice(() => 123)
      expect(typeof faker['_price']).toBe('function')
      //@ts-expect-error _price is a callable
      expect(faker['_price']()).toBe(123)
      expect(faker.price).toBe(123)
    })

    it('should pass index to price factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withPrice(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('description prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_description']).toBe('function')
    })

    it('withDescription', () => {
      const faker = aProduct().withDescription('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.description).toBe('123')

      faker.withDescription(() => '123')
      expect(typeof faker['_description']).toBe('function')
      //@ts-expect-error _description is a callable
      expect(faker['_description']()).toBe('123')
      expect(faker.description).toBe('123')
    })

    it('should pass index to description factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withDescription(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('packaging prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_packaging']).toBe('function')
    })

    it('withPackaging', () => {
      const faker = aProduct().withPackaging('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.packaging).toBe('123')

      faker.withPackaging(() => '123')
      expect(typeof faker['_packaging']).toBe('function')
      //@ts-expect-error _packaging is a callable
      expect(faker['_packaging']()).toBe('123')
      expect(faker.packaging).toBe('123')
    })

    it('should pass index to packaging factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withPackaging(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('registrationDate prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_registrationDate']).toBe('function')
    })

    it('withRegistrationDate', () => {
      const faker = aProduct().withRegistrationDate(new Date())
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.registrationDate).toBeInstanceOf(Date)

      faker.withRegistrationDate(() => new Date())
      expect(typeof faker['_registrationDate']).toBe('function')
      //@ts-expect-error _registrationDate is a callable
      expect(faker['_registrationDate']()).toBeInstanceOf(Date)
      expect(faker.registrationDate).toBeInstanceOf(Date)
    })

    it('should pass index to registrationDate factory', () => {
      const mockFactory = jest.fn(() => new Date())
      theProducts(2).withRegistrationDate(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('unitQuantity prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_unitQuantity']).toBe('function')
    })

    it('withUnitQuantity', () => {
      const faker = aProduct().withUnitQuantity(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.unitQuantity).toBe(123)

      faker.withUnitQuantity(() => 123)
      expect(typeof faker['_unitQuantity']).toBe('function')
      //@ts-expect-error _unitQuantity is a callable
      expect(faker['_unitQuantity']()).toBe(123)
      expect(faker.unitQuantity).toBe(123)
    })

    it('should pass index to unitQuantity factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withUnitQuantity(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('grossWeight prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_grossWeight']).toBe('function')
    })

    it('withGrossWeight', () => {
      const faker = aProduct().withGrossWeight(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.grossWeight).toBe(123)

      faker.withGrossWeight(() => 123)
      expect(typeof faker['_grossWeight']).toBe('function')
      //@ts-expect-error _grossWeight is a callable
      expect(faker['_grossWeight']()).toBe(123)
      expect(faker.grossWeight).toBe(123)
    })

    it('should pass index to grossWeight factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withGrossWeight(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('bonusValue prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_bonusValue']).toBe('function')
    })

    it('withBonusValue', () => {
      const faker = aProduct().withBonusValue(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.bonusValue).toBe(123)

      faker.withBonusValue(() => 123)
      expect(typeof faker['_bonusValue']).toBe('function')
      //@ts-expect-error _bonusValue is a callable
      expect(faker['_bonusValue']()).toBe(123)
      expect(faker.bonusValue).toBe(123)
    })

    it('should pass index to bonusValue factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withBonusValue(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('masterUnit prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_masterUnit']).toBe('function')
    })

    it('withMasterUnit', () => {
      const faker = aProduct().withMasterUnit('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.masterUnit).toBe('123')

      faker.withMasterUnit(() => '123')
      expect(typeof faker['_masterUnit']).toBe('function')
      //@ts-expect-error _masterUnit is a callable
      expect(faker['_masterUnit']()).toBe('123')
      expect(faker.masterUnit).toBe('123')
    })

    it('should pass index to masterUnit factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withMasterUnit(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('unit prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_unit']).toBe('function')
    })

    it('withUnit', () => {
      const faker = aProduct().withUnit('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.unit).toBe('123')

      faker.withUnit(() => '123')
      expect(typeof faker['_unit']).toBe('function')
      //@ts-expect-error _unit is a callable
      expect(faker['_unit']()).toBe('123')
      expect(faker.unit).toBe('123')
    })

    it('should pass index to unit factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withUnit(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('sectionCode prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_sectionCode']).toBe('function')
    })

    it('withSectionCode', () => {
      const faker = aProduct().withSectionCode(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.sectionCode).toBe(123)

      faker.withSectionCode(() => 123)
      expect(typeof faker['_sectionCode']).toBe('function')
      //@ts-expect-error _sectionCode is a callable
      expect(faker['_sectionCode']()).toBe(123)
      expect(faker.sectionCode).toBe(123)
    })

    it('should pass index to sectionCode factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withSectionCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('section prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_section']).toBe('function')
    })

    it('withSection', () => {
      const faker = aProduct().withSection('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.section).toBe('123')

      faker.withSection(() => '123')
      expect(typeof faker['_section']).toBe('function')
      //@ts-expect-error _section is a callable
      expect(faker['_section']()).toBe('123')
      expect(faker.section).toBe('123')
    })

    it('should pass index to section factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withSection(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('departmentCode prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_departmentCode']).toBe('function')
    })

    it('withDepartmentCode', () => {
      const faker = aProduct().withDepartmentCode(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.departmentCode).toBe(123)

      faker.withDepartmentCode(() => 123)
      expect(typeof faker['_departmentCode']).toBe('function')
      //@ts-expect-error _departmentCode is a callable
      expect(faker['_departmentCode']()).toBe(123)
      expect(faker.departmentCode).toBe(123)
    })

    it('should pass index to departmentCode factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withDepartmentCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('department prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_department']).toBe('function')
    })

    it('withDepartment', () => {
      const faker = aProduct().withDepartment('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.department).toBe('123')

      faker.withDepartment(() => '123')
      expect(typeof faker['_department']).toBe('function')
      //@ts-expect-error _department is a callable
      expect(faker['_department']()).toBe('123')
      expect(faker.department).toBe('123')
    })

    it('should pass index to department factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withDepartment(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('supplierCode prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_supplierCode']).toBe('function')
    })

    it('withSupplierCode', () => {
      const faker = aProduct().withSupplierCode(123)
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.supplierCode).toBe(123)

      faker.withSupplierCode(() => 123)
      expect(typeof faker['_supplierCode']).toBe('function')
      //@ts-expect-error _supplierCode is a callable
      expect(faker['_supplierCode']()).toBe(123)
      expect(faker.supplierCode).toBe(123)
    })

    it('should pass index to supplierCode factory', () => {
      const mockFactory = jest.fn(() => 123)
      theProducts(2).withSupplierCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('supplier prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_supplier']).toBe('function')
    })

    it('withSupplier', () => {
      const faker = aProduct().withSupplier('123')
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.supplier).toBe('123')

      faker.withSupplier(() => '123')
      expect(typeof faker['_supplier']).toBe('function')
      //@ts-expect-error _supplier is a callable
      expect(faker['_supplier']()).toBe('123')
      expect(faker.supplier).toBe('123')
    })

    it('should pass index to supplier factory', () => {
      const mockFactory = jest.fn(() => '123')
      theProducts(2).withSupplier(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('createdAt prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_createdAt']).toBe('function')
    })

    it('withCreatedAt', () => {
      const faker = aProduct().withCreatedAt(new Date())
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.createdAt).toBeInstanceOf(Date)

      faker.withCreatedAt(() => new Date())
      expect(typeof faker['_createdAt']).toBe('function')
      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBeInstanceOf(Date)
      expect(faker.createdAt).toBeInstanceOf(Date)
    })

    it('should pass index to createdAt factory', () => {
      const mockFactory = jest.fn(() => new Date())
      theProducts(2).withCreatedAt(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('updatedAt prop', () => {
    it('should be a function', () => {
      expect(typeof aProduct()['_updatedAt']).toBe('function')
    })

    it('withUpdatedAt', () => {
      const faker = aProduct().withUpdatedAt(new Date())
      expect(faker).toBeInstanceOf(ProductFakeBuilder)
      expect(faker.updatedAt).toBeInstanceOf(Date)

      faker.withUpdatedAt(() => new Date())
      expect(typeof faker['_updatedAt']).toBe('function')
      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBeInstanceOf(Date)
      expect(faker.updatedAt).toBeInstanceOf(Date)
    })

    it('should pass index to updatedAt factory', () => {
      const mockFactory = jest.fn(() => new Date())
      theProducts(2).withUpdatedAt(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })
})
