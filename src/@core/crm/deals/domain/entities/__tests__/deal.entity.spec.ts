import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { format } from 'date-fns'

describe('DealEntity unit tests', () => {
  it('Deve criar uma entity com construtor', () => {
    const deal = new DealEntity(
      {
        companyId: '213123',
        name: 'teste',
        pipelineId: '213123',
        stage: 'create',
      },
      '99322',
    )

    expect(deal).toBeInstanceOf(DealEntity)
    expect(deal.id).toBe('99322')
  })

  it('Deve criar uma entity com create method', () => {
    const deal = DealEntity.create(
      {
        companyId: '213123',
        name: 'teste',
        pipelineId: '213123',
        stage: 'create',
      },
      '31223',
    )

    expect(deal).toBeInstanceOf(DealEntity)
    expect(deal.id).toBe('31223')
  })

  it('Deve retornar id', () => {
    const deal = new DealEntity(
      {
        companyId: '213123',
        name: 'teste',
        pipelineId: '213123',
        stage: 'create',
      },
      '123',
    )

    expect(deal.id).toBe('123')
  })

  it('Deve retornar corretamente o toJSON', () => {
    const deal = new DealEntity(
      {
        companyId: '213123',
        name: 'teste',
        pipelineId: '213123',
        stage: 'create',
        amount: 2312,
        billingDate: new Date(),
        branchCode: 2312,
        closeDate: new Date(),
        customerCode: 2312,
        date: new Date(),
        deliveryDate: new Date(),
        limit: 2312,
        loadNumber: 2312,
        mediumTerm: 2312,
        middleOrder: '2312',
        noteNumber: 2312,
        orderNumber: 2312,
        paymentPlanCode: 2312,
        paymentPlanDescription: '2312',
        salesCode: 2312,
        salesDescription: '2312',
        salesTransactionCode: 2312,
        supervisorCode: 2312,
        supervisorDescription: 'supervisorDescription',
        totalWeight: '2312',
        valueServed: 2312,
        bonusValue: '2312',
        quantityItems: 2312,
        orderItems: [{ id: '2312' }],
      },
      '123',
    )

    expect(deal.toJSON()).toEqual({
      id: '123',
      companyId: '213123',
      name: 'teste',
      pipelineId: '213123',
      stage: 'create',
      amount: 2312,
      billingDate: expect.any(Date),
      branchCode: 2312,
      closeDate: expect.any(Date),
      customerCode: 2312,
      date: expect.any(Date),
      deliveryDate: expect.any(Date),
      limit: 2312,
      loadNumber: 2312,
      mediumTerm: 2312,
      middleOrder: '2312',
      noteNumber: 2312,
      orderNumber: 2312,
      paymentPlanCode: 2312,
      paymentPlanDescription: '2312',
      salesCode: 2312,
      salesDescription: '2312',
      salesTransactionCode: 2312,
      supervisorCode: 2312,
      supervisorDescription: 'supervisorDescription',
      totalWeight: '2312',
      valueServed: 2312,
      bonusValue: '2312',
      quantityItems: 2312,
      orderItems: [{ id: '2312' }],
    })
  })

  it('Deve retornar corretamente o toCrm', () => {
    const date = new Date()

    const deal = new DealEntity({
      companyId: '213123',
      name: 'teste',
      pipelineId: '213123',
      stage: 'create',
      amount: 2312,
      billingDate: date,
      branchCode: 2312,
      closeDate: date,
      customerCode: 2312,
      date: date,
      limit: 2312,
      loadNumber: 2312,
      mediumTerm: 2312,
      middleOrder: '2312',
      noteNumber: 2312,
      orderNumber: 2312,
      paymentPlanCode: 2312,
      paymentPlanDescription: '2312',
      salesCode: 2312,
      salesDescription: '2312',
      salesTransactionCode: 2312,
      supervisorCode: 2312,
      supervisorDescription: '2312',
      totalWeight: '2312',
      valueServed: 2312,
      bonusValue: '2312',
      quantityItems: 2312,

      orderItems: [{ id: '2312' }],
    })

    expect(deal.toCrm()).toEqual({
      amount: '2312.00',
      dealname: 'teste',
      dealstage: 'create',
      billing_date: format(date, 'yyyy-MM-dd'),
      branch_code: '2312',
      closedate: date.toISOString(),
      customer_code: '2312',
      date: format(date, 'yyyy-MM-dd'),
      limit: '2312.00',
      load_number: '2312',
      medium_term: '2312',
      middle_order: '2312',
      note_number: '2312',
      order_number: '2312',
      payment_plan_code: '2312',
      payment_plan_description: '2312',
      sales_code: '2312',
      sales_description: '2312',
      sales_transaction_code: '2312',
      supervisor_code: '2312',
      supervisor_description: '2312',
      total_weight: '2312.00',
      bonus_value: '2312.00',
      quantity_items: '2312',
    })
  })
})
