import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'

export class OrderInfraMapper {
  static toDomain(input: OrderModel): OrderEntity {
    return OrderEntity.create({
      customerCode: input.CODCLI,
      amount: input.VLTOTAL ?? '0',
      loadCode: input.NUMCAR,
      orderCode: input.NUMPED,
      noteCode: input.NUMNOTA,
      billingDate: input.DTFAT,
      deliveryDate: input.DTENTREGA,
      date: input.DATA,
      position: input.POSICAO,
      branchCode: input.CODFILIAL,
      mediumTerm: input.PRAZOMEDIO,
      quantityItems: input.NUMITENS,
      middleOrder: input.ORIGEMPED,
      paymentPlanCode: input.paymentPlan?.CODPLPAG,
      paymentPlanDescription: input.paymentPlan?.DESCRICAO,
      salesCode: input.sales?.CODUSUR,
      salesDescription: input.sales?.NOME,
      salesTransactionCode: input.NUMTRANSVENDA,
      supervisorCode: input.supervisor?.CODSUPERVISOR,
      supervisorDescription: input.supervisor?.NOME,
      totalWeight: input.TOTPESO,
      valueServed: +parseFloat(input.VLATEND).toFixed(2),
      bonusValue: input.VLBONIFIC,
      items: input.orderItems?.map((item) => ({
        productCode: item.producCode,
      })),
    })
  }
}
