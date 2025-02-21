import { DeliveryDetailEntity } from '@/@core/fusion/domain/entities/delivery-detail/delivery-detail.entity'

describe('DeliveryDetailEntity unit tests', () => {
  it('should create a DeliveryDetailEntity', () => {
    const deliveryDetail = DeliveryDetailEntity.create({
      id: '123',
      orderId: 123,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    expect(deliveryDetail).toBeInstanceOf(DeliveryDetailEntity)
    expect(deliveryDetail.id).toBe('123')
    expect(deliveryDetail.orderId).toBe(123)
    expect(deliveryDetail.date).toBeInstanceOf(Date)
    expect(deliveryDetail.createdAt).toBeInstanceOf(Date)
    expect(deliveryDetail.updatedAt).toBeInstanceOf(Date)
  })

  it('should throw an error when there is no orderId', () => {
    expect(() =>
      DeliveryDetailEntity.create({
        id: '123',
        orderId: null,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ).toThrow('Order id is required')
  })

  it('should throw an error when there is no date', () => {
    expect(() =>
      DeliveryDetailEntity.create({
        id: '123',
        orderId: 123,
        date: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ).toThrow('Date is required')
  })
})
