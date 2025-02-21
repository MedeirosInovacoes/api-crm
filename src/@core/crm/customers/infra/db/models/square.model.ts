import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('PCPRACA')
export class SquareModel {
  @ManyToOne(() => CustomerModel, (client) => client.square)
  @JoinColumn({ name: 'CODPRACA', referencedColumnName: 'CODPRACA' })
  client: CustomerModel

  @PrimaryColumn()
  CODPRACA: number

  @Column()
  PRACA: string
}
