import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCPLPAG')
export class PaymentPlanModel {
  @PrimaryColumn()
  CODPLPAG: number

  @Column()
  DESCRICAO: string
}
