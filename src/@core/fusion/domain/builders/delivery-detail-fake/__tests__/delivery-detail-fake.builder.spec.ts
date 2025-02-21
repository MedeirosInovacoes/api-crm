import { DeliveryDetailFakeBuilder } from '@/@core/fusion/domain/builders/delivery-detail-fake/delivery-detail-fake.builder'
import { Faker, pt_BR } from '@faker-js/faker'

describe('DeliveryDetailFakeBuilder unit tests', () => {
  describe('id prop', () => {
    const deliveryDetailBuilder = DeliveryDetailFakeBuilder.aDeliveryDetail()

    it('should be a function', () => {
      expect(typeof deliveryDetailBuilder['_id']).toBe('function')
    })

    it('should call the uuid method', () => {
      const faker = new Faker({
        locale: [pt_BR],
      })

      const spyUuidMethod = jest.spyOn(faker.string, 'uuid')
      deliveryDetailBuilder['faker'] = faker
      deliveryDetailBuilder.build()

      expect(spyUuidMethod).toHaveBeenCalled()
    })

    it('withId', () => {
      const faker = deliveryDetailBuilder.withId('123')
      expect(faker).toBeInstanceOf(DeliveryDetailFakeBuilder)
      expect(faker.id).toBe('123')

      faker.withId(() => '123')
      expect(typeof faker['_id']).toBe('function')
      //@ts-expect-error _id is a callable
      expect(faker['_id']()).toBe('123')
      expect(faker.id).toBe('123')
    })

    it('should pass index to id factory', () => {
      const mockFactory = jest.fn(() => '123')
      DeliveryDetailFakeBuilder.theDeliveryDetail(2).withId(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('orderId prop', () => {
    const deliveryDetailBuilder = DeliveryDetailFakeBuilder.aDeliveryDetail()

    it('should be a function', () => {
      expect(typeof deliveryDetailBuilder['_orderId']).toBe('function')
    })

    it('should call the int method', () => {
      const spyMethod = jest.spyOn(deliveryDetailBuilder.faker.number, 'int')
      deliveryDetailBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withOrderId', () => {
      const faker = deliveryDetailBuilder.withOrderId(12345)
      expect(faker).toBeInstanceOf(DeliveryDetailFakeBuilder)
      expect(faker.orderId).toBe(12345)

      faker.withOrderId(() => 12345)
      expect(typeof faker['_orderId']).toBe('function')
      //@ts-expect-error _orderId is a callable
      expect(faker['_orderId']()).toBe(12345)
      expect(faker.orderId).toBe(12345)
    })

    it('should pass index to orderId factory', () => {
      const mockFactory = jest.fn(() => 12345)
      DeliveryDetailFakeBuilder.theDeliveryDetail(2).withOrderId(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('date prop', () => {
    const deliveryDetailBuilder = DeliveryDetailFakeBuilder.aDeliveryDetail()

    it('should be a function', () => {
      expect(typeof deliveryDetailBuilder['_date']).toBe('function')
    })

    it('should call the recent method', () => {
      const spyMethod = jest.spyOn(deliveryDetailBuilder.faker.date, 'recent')
      deliveryDetailBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withDate', () => {
      const date = new Date()
      const faker = deliveryDetailBuilder.withDate(date)
      expect(faker).toBeInstanceOf(DeliveryDetailFakeBuilder)
      expect(faker.date).toBe(date)

      faker.withDate(() => date)
      expect(typeof faker['_date']).toBe('function')
      //@ts-expect-error _date is a callable
      expect(faker['_date']()).toBe(date)
      expect(faker.date).toBe(date)
    })

    it('should pass index to date factory', () => {
      const mockFactory = jest.fn(() => new Date())
      DeliveryDetailFakeBuilder.theDeliveryDetail(2).withDate(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('createdAt prop', () => {
    const deliveryDetailBuilder = DeliveryDetailFakeBuilder.aDeliveryDetail()

    it('should be a function', () => {
      expect(typeof deliveryDetailBuilder['_createdAt']).toBe('function')
    })

    it('should call the recent method', () => {
      const spyMethod = jest.spyOn(deliveryDetailBuilder.faker.date, 'recent')
      deliveryDetailBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withCreatedAt', () => {
      const date = new Date()
      const faker = deliveryDetailBuilder.withCreatedAt(date)
      expect(faker).toBeInstanceOf(DeliveryDetailFakeBuilder)
      expect(faker.createdAt).toBe(date)

      faker.withCreatedAt(() => date)
      expect(typeof faker['_createdAt']).toBe('function')
      //@ts-expect-error _createdAt is a callable
      expect(faker['_createdAt']()).toBe(date)
      expect(faker.createdAt).toBe(date)
    })

    it('should pass index to createdAt factory', () => {
      const mockFactory = jest.fn(() => new Date())
      DeliveryDetailFakeBuilder.theDeliveryDetail(2).withCreatedAt(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })

  describe('updatedAt prop', () => {
    const deliveryDetailBuilder = DeliveryDetailFakeBuilder.aDeliveryDetail()

    it('should be a function', () => {
      expect(typeof deliveryDetailBuilder['_updatedAt']).toBe('function')
    })

    it('should call the recent method', () => {
      const spyMethod = jest.spyOn(deliveryDetailBuilder.faker.date, 'recent')
      deliveryDetailBuilder.build()

      expect(spyMethod).toHaveBeenCalled()
    })

    it('withUpdatedAt', () => {
      const date = new Date()
      const faker = deliveryDetailBuilder.withUpdatedAt(date)
      expect(faker).toBeInstanceOf(DeliveryDetailFakeBuilder)
      expect(faker.updatedAt).toBe(date)

      faker.withUpdatedAt(() => date)
      expect(typeof faker['_updatedAt']).toBe('function')
      //@ts-expect-error _updatedAt is a callable
      expect(faker['_updatedAt']()).toBe(date)
      expect(faker.updatedAt).toBe(date)
    })

    it('should pass index to createdAt factory', () => {
      const mockFactory = jest.fn(() => new Date())
      DeliveryDetailFakeBuilder.theDeliveryDetail(2).withUpdatedAt(mockFactory).build()
      expect(mockFactory).toHaveBeenCalledTimes(2)
    })
  })
})
