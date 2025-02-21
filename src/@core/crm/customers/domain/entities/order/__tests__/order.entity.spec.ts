import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'

describe('OrderEntity unit tests', () => {
  it('Deve criar uma nova instância de OrderEntity', () => {
    const order = new OrderEntity({
      amount: 'amount',
      customerCode: 1,
      loadCode: 1,
      orderCode: 1,
      noteCode: 1,
      billingDate: new Date(),
      deliveryDate: new Date(),
      position: 'position',
      date: new Date(),
      branchCode: 1,
      mediumTerm: 1,
      quantityItems: 1,
      middleOrder: 'middleOrder',
      paymentPlanCode: 1,
      paymentPlanDescription: 'paymentPlanDescription',
      salesCode: 1,
      salesTransactionCode: 1,
      salesDescription: 'salesDescription',
      supervisorCode: 1,
      supervisorDescription: 'supervisorDescription',
      totalWeight: 'totalWeight',
      valueServed: 'valueServed',
      bonusValue: 'bonusValue',
      items: [
        {
          productCode: 1,
        },
      ],
    })

    expect(order).toBeInstanceOf(OrderEntity)
  })

  it('Deve criar uma nova instância com método estático create', () => {
    const order = OrderEntity.create({
      amount: 'amount',
      customerCode: 1,
      loadCode: 1,
      orderCode: 1,
      noteCode: 1,
      billingDate: new Date(),
      deliveryDate: new Date(),
      position: 'position',
      date: new Date(),
      branchCode: 1,
      mediumTerm: 1,
      quantityItems: 1,
      middleOrder: 'middleOrder',
      paymentPlanCode: 1,
      paymentPlanDescription: 'paymentPlanDescription',
      salesCode: 1,
      salesTransactionCode: 1,
      salesDescription: 'salesDescription',
      supervisorCode: 1,
      supervisorDescription: 'supervisorDescription',
      totalWeight: 'totalWeight',
      valueServed: 'valueServed',
      bonusValue: 'bonusValue',
      items: [
        {
          productCode: 1,
        },
      ],
    })

    expect(order).toBeInstanceOf(OrderEntity)
  })

  it('Deve retornar um objeto com os valores do OrderEntity', () => {
    const props = {
      amount: 'amount',
      customerCode: 1,
      loadCode: 1,
      orderCode: 1,
      noteCode: 1,
      billingDate: new Date(),
      deliveryDate: new Date(),
      position: 'position',
      date: new Date(),
      branchCode: 1,
      mediumTerm: 1,
      quantityItems: 1,
      middleOrder: 'middleOrder',
      paymentPlanCode: 1,
      paymentPlanDescription: 'paymentPlanDescription',
      salesCode: 1,
      salesTransactionCode: 1,
      salesDescription: 'salesDescription',
      supervisorCode: 1,
      supervisorDescription: 'supervisorDescription',
      totalWeight: 'totalWeight',
      valueServed: 'valueServed',
      bonusValue: 'bonusValue',
      items: [
        {
          productCode: 1,
        },
      ],
    }
    const order = OrderEntity.create(props, '32422')

    expect(order.toJSON()).toEqual({
      id: '32422',
      ...props,
    })
  })
})
