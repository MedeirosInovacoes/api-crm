import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { OrderItemModel } from '@/@core/crm/customers/infra/db/models/order-item.model'
import { PaymentPlanModel } from '@/@core/crm/customers/infra/db/models/payment-plan.model'
import { SupervisorModel } from '@/@core/crm/customers/infra/db/models/supervisor.model'
import { UserModel } from '@/@core/crm/customers/infra/db/models/user.model'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

@Entity('PCPEDC')
export class OrderModel {
  @ManyToOne(() => CustomerModel, (client: { orders: any }) => client.orders)
  @JoinColumn({ name: 'CODCLI', referencedColumnName: 'CODCLI' })
  client: CustomerModel

  @OneToMany(() => OrderItemModel, (orderItem) => orderItem.order)
  @JoinColumn({ name: 'NUMPED', referencedColumnName: 'NUMPED' })
  orderItems: OrderItemModel[]

  @OneToOne(() => SupervisorModel)
  @JoinColumn({ name: 'CODSUPERVISOR', referencedColumnName: 'CODSUPERVISOR' })
  supervisor: SupervisorModel

  @OneToOne(() => UserModel)
  @JoinColumn({ name: 'CODUSUR', referencedColumnName: 'CODUSUR' })
  sales: UserModel

  @OneToOne(() => PaymentPlanModel)
  @JoinColumn({ name: 'CODPLPAG', referencedColumnName: 'CODPLPAG' })
  paymentPlan: PaymentPlanModel

  /** *
   * NÚMERO DO PEDIDO
   */
  @PrimaryColumn()
  NUMPED: number

  /** *
   * DATA DO PEDIDO
   */
  @Column()
  DATA: Date

  /** *
   * VALOR TOTAL DO PEDIDO
   */
  @Column({ precision: 2 })
  VLTOTAL: string

  /** *
   * CÓDIGO DO CLIENTE
   */
  @Column()
  CODCLI: number

  /** *
   * DATA DA ENTREGA
   */
  @Column()
  DTENTREGA: Date

  /** *
   * CÓDIGO DA FILIAL
   */
  @Column()
  CODFILIAL: number

  /** *
   * PESO DO PEDIDO
   */
  @Column({ precision: 2 })
  TOTPESO: string

  /** *
   * QUANTIDADE DE ITENS DO PEDIDO
   */
  @Column()
  NUMITENS: number

  /** *
   * ---------
   */
  @Column({ precision: 2 })
  VLATEND: string

  /** *
   * NÚMERO DO CARREGAMENTO
   */
  @Column()
  NUMCAR: number

  /** *
   * CÓDIGO DA VENDA
   */
  @Column()
  CONDVENDA: number

  /** *
   * PRAZO MÉDIO DO PEDIDO
   */
  @Column()
  PRAZOMEDIO: number

  /** *
   * NÚMERO DA NOTA
   */
  @Column()
  NUMNOTA: number

  /** *
   * NÚMERO DA TRANSAÇÃO DE VENDA
   */
  @Column()
  NUMTRANSVENDA: number

  /** *
   * ORIGEM DO PEDIDO
   */
  @Column()
  ORIGEMPED: string

  /** *
   * DATA DO FATURAMENTO
   */
  @Column()
  DTFAT: Date

  /** *
   * VALOR BONIFICADO
   */
  @Column({ precision: 2 })
  VLBONIFIC: string

  /** *
   * --------
   */
  @Column()
  POSICAO: string
}
