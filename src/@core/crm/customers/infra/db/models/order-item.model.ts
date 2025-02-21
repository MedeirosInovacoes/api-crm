import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('PCPEDI')
export class OrderItemModel {
  @ManyToOne(() => OrderModel, (order) => order.orderItems)
  @JoinColumn({ name: 'NUMPED', referencedColumnName: 'NUMPED' })
  order: OrderModel

  @PrimaryColumn({ name: 'NUMPED' })
  NUMPED: number

  @PrimaryColumn({ name: 'CODPROD' })
  producCode: number
}
