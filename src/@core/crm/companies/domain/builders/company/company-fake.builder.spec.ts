import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'

describe('CompanyFakeBuilder unit tests', () => {
  let companyBuilder: CompanyFakeBuilder

  beforeEach(() => {
    companyBuilder = CompanyFakeBuilder.aCompany()
  })

  describe('id prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_id']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withId', () => {
      const faker = companyBuilder.withId('123')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.id).toBe('123')

      faker.withId(() => '123')
      expect(typeof faker['_id']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_id']()).toBe('123')
      expect(faker.id).toBe('123')
    })

    it('should pass index to id factory', () => {
      const mockFactory = jest.fn(() => '123')
      CompanyFakeBuilder.theCompany(2).withId(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('active prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_active']).toBe('function')
    })

    it('should call the arrayElement method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.helpers, 'arrayElement')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withActive', () => {
      const faker = companyBuilder.withActive('S')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.active).toBe('S')

      faker.withActive(() => 'N')
      expect(typeof faker['_active']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_active']()).toBe('N')
      expect(faker.active).toBe('N')
    })

    it('should pass index to active factory', () => {
      const mockFactory = jest.fn(() => 'S')
      CompanyFakeBuilder.theCompany(2).withActive(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('activityCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_activityCode']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withActivityCode', () => {
      const faker = companyBuilder.withActivityCode(2321)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.activityCode).toBe(2321)

      faker.withActivityCode(() => 2321)
      expect(typeof faker['_activityCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_activityCode']()).toBe(2321)
      expect(faker.activityCode).toBe(2321)
    })

    it('should pass index to activityCode factory', () => {
      const mockFactory = jest.fn(() => 2321)
      CompanyFakeBuilder.theCompany(2).withActivityCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('activityDescription prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_activityDescription']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withActivityDescription', () => {
      const faker = companyBuilder.withActivityDescription('teste')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.activityDescription).toBe('teste')

      faker.withActivityDescription(() => 'teste')
      expect(typeof faker['_activityDescription']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_activityDescription']()).toBe('teste')
      expect(faker.activityDescription).toBe('teste')
    })

    it('should pass index to activityDescription factory', () => {
      const mockFactory = jest.fn(() => 'teste')
      CompanyFakeBuilder.theCompany(2).withActivityDescription(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('channelDescription prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_channelDescription']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withChannelDescription', () => {
      const faker = companyBuilder.withChannelDescription('teste')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.channelDescription).toBe('teste')

      faker.withChannelDescription(() => 'teste')
      expect(typeof faker['_channelDescription']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_channelDescription']()).toBe('teste')
      expect(faker.channelDescription).toBe('teste')
    })

    it('should pass index to channelDescription factory', () => {
      const mockFactory = jest.fn(() => 'teste')
      CompanyFakeBuilder.theCompany(2).withChannelDescription(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('address prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_address']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withAddress', () => {
      const faker = companyBuilder.withAddress('teste')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.address).toBe('teste')

      faker.withAddress(() => 'teste')
      expect(typeof faker['_address']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_address']()).toBe('teste')
      expect(faker.address).toBe('teste')
    })

    it('should pass index to address factory', () => {
      const mockFactory = jest.fn(() => 'teste')
      CompanyFakeBuilder.theCompany(2).withAddress(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('availableLimit prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_availableLimit']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withAvailableLimit', () => {
      const faker = companyBuilder.withAvailableLimit(5252)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.availableLimit).toBe(5252)

      faker.withAvailableLimit(() => 5252)
      expect(typeof faker['_availableLimit']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_availableLimit']()).toBe(5252)
      expect(faker.availableLimit).toBe(5252)
    })

    it('should pass index to availableLimit factory', () => {
      const mockFactory = jest.fn(() => 5252)
      CompanyFakeBuilder.theCompany(2).withAvailableLimit(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('averageTermMonthly prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_averageTermMonthly']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withaverageTermMonthly', () => {
      const faker = companyBuilder.withAverageTermMonthly(5252)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.averageTermMonthly).toBe(5252)

      faker.withAverageTermMonthly(() => 5252)
      expect(typeof faker['_averageTermMonthly']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_averageTermMonthly']()).toBe(5252)
      expect(faker.averageTermMonthly).toBe(5252)
    })

    it('should pass index to averageTermMonthly factory', () => {
      const mockFactory = jest.fn(() => 5252)
      CompanyFakeBuilder.theCompany(2).withAverageTermMonthly(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('averageTicketMonthly prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_averageTicketMonthly']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withverageTermMonthly', () => {
      const faker = companyBuilder.withAverageTicketMonthly(5252)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.averageTicketMonthly).toBe(5252)

      faker.withAverageTicketMonthly(() => 5252)
      expect(typeof faker['_averageTicketMonthly']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_averageTicketMonthly']()).toBe(5252)
      expect(faker.averageTicketMonthly).toBe(5252)
    })

    it('should pass index to averageTicketMonthly factory', () => {
      const mockFactory = jest.fn(() => 5252)
      CompanyFakeBuilder.theCompany(2).withAverageTicketMonthly(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  // Existing tests...

  describe('billingBranchCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_billingBranchCode']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withBillingBranchCode', () => {
      const faker = companyBuilder.withBillingBranchCode(4321)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.billingBranchCode).toBe(4321)

      faker.withBillingBranchCode(() => 4321)
      expect(typeof faker['_billingBranchCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_billingBranchCode']()).toBe(4321)
      expect(faker.billingBranchCode).toBe(4321)
    })

    it('should pass index to billingBranchCode factory', () => {
      const mockFactory = jest.fn(() => 4321)
      CompanyFakeBuilder.theCompany(2).withBillingBranchCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('billingBranchDescription prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_billingBranchDescription']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withBillingBranchDescription', () => {
      const faker = companyBuilder.withBillingBranchDescription('billing branch')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.billingBranchDescription).toBe('billing branch')

      faker.withBillingBranchDescription(() => 'billing branch')
      expect(typeof faker['_billingBranchDescription']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_billingBranchDescription']()).toBe('billing branch')
      expect(faker.billingBranchDescription).toBe('billing branch')
    })

    it('should pass index to billingBranchDescription factory', () => {
      const mockFactory = jest.fn(() => 'billing branch')
      CompanyFakeBuilder.theCompany(2).withBillingBranchDescription(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('blocked prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_blocked']).toBe('function')
    })

    it('should call the boolean method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.datatype, 'boolean')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withBlocked', () => {
      const faker = companyBuilder.withBlocked(true)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.blocked).toBe(true)

      faker.withBlocked(() => false)
      expect(typeof faker['_blocked']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_blocked']()).toBe(false)
      expect(faker.blocked).toBe(false)
    })

    it('should pass index to blocked factory', () => {
      const mockFactory = jest.fn(() => true)
      CompanyFakeBuilder.theCompany(2).withBlocked(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('city prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_city']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withCity', () => {
      const faker = companyBuilder.withCity('City')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.city).toBe('City')

      faker.withCity(() => 'City')
      expect(typeof faker['_city']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_city']()).toBe('City')
      expect(faker.city).toBe('City')
    })

    it('should pass index to city factory', () => {
      const mockFactory = jest.fn(() => 'City')
      CompanyFakeBuilder.theCompany(2).withCity(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('classification prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_classification']).toBe('function')
    })

    it('should call the arrayElement method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.helpers, 'arrayElement')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withClassification', () => {
      const faker = companyBuilder.withClassification('A')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.classification).toBe('A')

      faker.withClassification(() => 'B')
      expect(typeof faker['_classification']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_classification']()).toBe('B')
      expect(faker.classification).toBe('B')
    })

    it('should pass index to classification factory', () => {
      const mockFactory = jest.fn(() => 'A')
      CompanyFakeBuilder.theCompany(2).withClassification(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('client prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_client']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withClient', () => {
      const faker = companyBuilder.withClient('Client')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.client).toBe('Client')

      faker.withClient(() => 'Client')
      expect(typeof faker['_client']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_client']()).toBe('Client')
      expect(faker.client).toBe('Client')
    })

    it('should pass index to client factory', () => {
      const mockFactory = jest.fn(() => 'Client')
      CompanyFakeBuilder.theCompany(2).withClient(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('complement prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_complement']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withComplement', () => {
      const faker = companyBuilder.withComplement('Complement')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.complement).toBe('Complement')

      faker.withComplement(() => 'Complement')
      expect(typeof faker['_complement']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_complement']()).toBe('Complement')
      expect(faker.complement).toBe('Complement')
    })

    it('should pass index to complement factory', () => {
      const mockFactory = jest.fn(() => 'Complement')
      CompanyFakeBuilder.theCompany(2).withComplement(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('cpf prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_cpf']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withCpf', () => {
      const faker = companyBuilder.withCpf('12345678900')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.cpf).toBe('12345678900')

      faker.withCpf(() => '12345678900')
      expect(typeof faker['_cpf']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_cpf']()).toBe('12345678900')
      expect(faker.cpf).toBe('12345678900')
    })

    it('should pass index to cpf factory', () => {
      const mockFactory = jest.fn(() => '12345678900')
      CompanyFakeBuilder.theCompany(2).withCpf(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('customerCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_customerCode']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withCustomerCode', () => {
      const faker = companyBuilder.withCustomerCode(1234)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.customerCode).toBe(1234)

      faker.withCustomerCode(() => 1234)
      expect(typeof faker['_customerCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_customerCode']()).toBe(1234)
      expect(faker.customerCode).toBe(1234)
    })

    it('should pass index to customerCode factory', () => {
      const mockFactory = jest.fn(() => 1234)
      CompanyFakeBuilder.theCompany(2).withCustomerCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('district prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_district']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withDistrict', () => {
      const faker = companyBuilder.withDistrict('District')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.district).toBe('District')

      faker.withDistrict(() => 'District')
      expect(typeof faker['_district']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_district']()).toBe('District')
      expect(faker.district).toBe('District')
    })

    it('should pass index to district factory', () => {
      const mockFactory = jest.fn(() => 'District')
      CompanyFakeBuilder.theCompany(2).withDistrict(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('emailNfe prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_emailNfe']).toBe('function')
    })

    it('should call the email method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.internet, 'email')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withEmailNfe', () => {
      const faker = companyBuilder.withEmailNfe('test@example.com')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.emailNfe).toBe('test@example.com')

      faker.withEmailNfe(() => 'test@example.com')
      expect(typeof faker['_emailNfe']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_emailNfe']()).toBe('test@example.com')
      expect(faker.emailNfe).toBe('test@example.com')
    })

    it('should pass index to emailNfe factory', () => {
      const mockFactory = jest.fn(() => 'test@example.com')
      CompanyFakeBuilder.theCompany(2).withEmailNfe(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('kindPerson prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_kindPerson']).toBe('function')
    })

    it('should call the arrayElement method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.helpers, 'arrayElement')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withKindPerson', () => {
      const faker = companyBuilder.withKindPerson('F')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.kindPerson).toBe('F')

      faker.withKindPerson(() => 'J')
      expect(typeof faker['_kindPerson']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_kindPerson']()).toBe('J')
      expect(faker.kindPerson).toBe('J')
    })

    it('should pass index to kindPerson factory', () => {
      const mockFactory = jest.fn(() => 'F')
      CompanyFakeBuilder.theCompany(2).withKindPerson(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('limit prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_limit']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withLimit', () => {
      const faker = companyBuilder.withLimit(5000)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.limit).toBe(5000)

      faker.withLimit(() => 5000)
      expect(typeof faker['_limit']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_limit']()).toBe(5000)
      expect(faker.limit).toBe(5000)
    })

    it('should pass index to limit factory', () => {
      const mockFactory = jest.fn(() => 5000)
      CompanyFakeBuilder.theCompany(2).withLimit(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('name prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_name']).toBe('function')
    })

    it('should call the fullName method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.person, 'fullName')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withName', () => {
      const faker = companyBuilder.withName('John Doe')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.name).toBe('John Doe')

      faker.withName(() => 'John Doe')
      expect(typeof faker['_name']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_name']()).toBe('John Doe')
      expect(faker.name).toBe('John Doe')
    })

    it('should pass index to name factory', () => {
      const mockFactory = jest.fn(() => 'John Doe')
      CompanyFakeBuilder.theCompany(2).withName(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('salesCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_salesCode']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withSalesCode', () => {
      const faker = companyBuilder.withSalesCode(1234)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.salesCode).toBe(1234)

      faker.withSalesCode(() => 1234)
      expect(typeof faker['_salesCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_salesCode']()).toBe(1234)
      expect(faker.salesCode).toBe(1234)
    })

    it('should pass index to salesCode factory', () => {
      const mockFactory = jest.fn(() => 1234)
      CompanyFakeBuilder.theCompany(2).withSalesCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('networkCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_networkCode']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withNetworkCode', () => {
      const faker = companyBuilder.withNetworkCode(1234)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.networkCode).toBe(1234)

      faker.withNetworkCode(() => 1234)
      expect(typeof faker['_networkCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_networkCode']()).toBe(1234)
      expect(faker.networkCode).toBe(1234)
    })

    it('should pass index to networkCode factory', () => {
      const mockFactory = jest.fn(() => 1234)
      CompanyFakeBuilder.theCompany(2).withNetworkCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('networkDescription prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_networkDescription']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withNetworkDescription', () => {
      const faker = companyBuilder.withNetworkDescription('Network')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.networkDescription).toBe('Network')

      faker.withNetworkDescription(() => 'Network')
      expect(typeof faker['_networkDescription']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_networkDescription']()).toBe('Network')
      expect(faker.networkDescription).toBe('Network')
    })

    it('should pass index to networkDescription factory', () => {
      const mockFactory = jest.fn(() => 'Network')
      CompanyFakeBuilder.theCompany(2).withNetworkDescription(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('originLead prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_originLead']).toBe('function')
    })

    it('should return "Winthor"', () => {
      const faker = companyBuilder.withOriginLead('Winthor')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.originLead).toBe('Winthor')

      faker.withOriginLead(() => 'Winthor')
      expect(typeof faker['_originLead']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_originLead']()).toBe('Winthor')
      expect(faker.originLead).toBe('Winthor')
    })
  })

  describe('squareCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_squareCode']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.number, 'int')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withSquareCode', () => {
      const faker = companyBuilder.withSquareCode(1234)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.squareCode).toBe(1234)

      faker.withSquareCode(() => 1234)
      expect(typeof faker['_squareCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_squareCode']()).toBe(1234)
      expect(faker.squareCode).toBe(1234)
    })

    it('should pass index to squareCode factory', () => {
      const mockFactory = jest.fn(() => 1234)
      CompanyFakeBuilder.theCompany(2).withSquareCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('squareDescription prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_squareDescription']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withSquareDescription', () => {
      const faker = companyBuilder.withSquareDescription('Square')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.squareDescription).toBe('Square')

      faker.withSquareDescription(() => 'Square')
      expect(typeof faker['_squareDescription']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_squareDescription']()).toBe('Square')
      expect(faker.squareDescription).toBe('Square')
    })

    it('should pass index to squareDescription factory', () => {
      const mockFactory = jest.fn(() => 'Square')
      CompanyFakeBuilder.theCompany(2).withSquareDescription(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('state prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_state']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withState', () => {
      const faker = companyBuilder.withState('State')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.state).toBe('State')

      faker.withState(() => 'State')
      expect(typeof faker['_state']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_state']()).toBe('State')
      expect(faker.state).toBe('State')
    })

    it('should pass index to state factory', () => {
      const mockFactory = jest.fn(() => 'State')
      CompanyFakeBuilder.theCompany(2).withState(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('stateRegistration prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_stateRegistration']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withStateRegistration', () => {
      const faker = companyBuilder.withStateRegistration('123456789')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.stateRegistration).toBe('123456789')

      faker.withStateRegistration(() => '123456789')
      expect(typeof faker['_stateRegistration']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_stateRegistration']()).toBe('123456789')
      expect(faker.stateRegistration).toBe('123456789')
    })

    it('should pass index to stateRegistration factory', () => {
      const mockFactory = jest.fn(() => '123456789')
      CompanyFakeBuilder.theCompany(2).withStateRegistration(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('website prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_website']).toBe('function')
    })

    it('should call the text method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.lorem, 'text')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withWebsite', () => {
      const faker = companyBuilder.withWebsite('https://example.com')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.website).toBe('https://example.com')

      faker.withWebsite(() => 'https://example.com')
      expect(typeof faker['_website']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_website']()).toBe('https://example.com')
      expect(faker.website).toBe('https://example.com')
    })

    it('should pass index to website factory', () => {
      const mockFactory = jest.fn(() => 'https://example.com')
      CompanyFakeBuilder.theCompany(2).withWebsite(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('winthorRegistrationDate prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_winthorRegistrationDate']).toBe('function')
    })

    it('should call the recent method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.date, 'recent')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withWinthorRegistrationDate', () => {
      const date = new Date()
      const faker = companyBuilder.withWinthorRegistrationDate(date)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.winthorRegistrationDate).toBe(date)

      faker.withWinthorRegistrationDate(() => date)
      expect(typeof faker['_winthorRegistrationDate']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_winthorRegistrationDate']()).toBe(date)
      expect(faker.winthorRegistrationDate).toBe(date)
    })

    it('should pass index to winthorRegistrationDate factory', () => {
      const mockFactory = jest.fn(() => new Date())
      CompanyFakeBuilder.theCompany(2).withWinthorRegistrationDate(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('zipCode prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_zipCode']).toBe('function')
    })

    it('should call the zipCode method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.location, 'zipCode')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withZipCode', () => {
      const faker = companyBuilder.withZipCode('12345-678')
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.zipCode).toBe('12345-678')

      faker.withZipCode(() => '12345-678')
      expect(typeof faker['_zipCode']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_zipCode']()).toBe('12345-678')
      expect(faker.zipCode).toBe('12345-678')
    })

    it('should pass index to zipCode factory', () => {
      const mockFactory = jest.fn(() => '12345-678')
      CompanyFakeBuilder.theCompany(2).withZipCode(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('createdAt prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_createdAt']).toBe('function')
    })

    it('should call the recent method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.date, 'recent')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withCreatedAt', () => {
      const date = new Date()
      const faker = companyBuilder.withCreatedAt(date)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.createdAt).toBe(date)

      faker.withCreatedAt(() => date)
      expect(typeof faker['_createdAt']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_createdAt']()).toBe(date)
      expect(faker.createdAt).toBe(date)
    })

    it('should pass index to createdAt factory', () => {
      const mockFactory = jest.fn(() => new Date())
      CompanyFakeBuilder.theCompany(2).withCreatedAt(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('updatedAt prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_updatedAt']).toBe('function')
    })

    it('should call the recent method', () => {
      const spyMethod = jest.spyOn(companyBuilder.faker.date, 'recent')
      companyBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withUpdatedAt', () => {
      const date = new Date()
      const faker = companyBuilder.withUpdatedAt(date)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.updatedAt).toBe(date)

      faker.withUpdatedAt(() => date)
      expect(typeof faker['_updatedAt']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_updatedAt']()).toBe(date)
      expect(faker.updatedAt).toBe(date)
    })

    it('should pass index to updatedAt factory', () => {
      const mockFactory = jest.fn(() => new Date())
      CompanyFakeBuilder.theCompany(2).withUpdatedAt(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('deals prop', () => {
    it('should be a function', () => {
      expect(typeof companyBuilder['_deals']).toBe('function')
    })

    it('should call the build method of DealFakeBuilder', () => {
      const dealBuilder = DealFakeBuilder.theDeals(2)
      const spyMethod = jest.spyOn(dealBuilder, 'build')
      companyBuilder['_deals'] = dealBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withDeals', () => {
      const deals = DealFakeBuilder.theDeals(2).build()
      const faker = companyBuilder.withDeals(deals)
      expect(faker).toBeInstanceOf(CompanyFakeBuilder)
      expect(faker.deals).toEqual(deals)

      faker.withDeals(() => deals)
      expect(typeof faker['_deals']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_deals']()).toEqual(deals)
      expect(faker.deals).toEqual(deals)
    })

    it('should pass index to deals factory', () => {
      const mockFactory = jest.fn(() => DealFakeBuilder.theDeals(2).build())
      CompanyFakeBuilder.theCompany(2).withDeals(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })
})
