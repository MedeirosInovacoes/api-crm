import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({
  schema: 'FUSIONT',
  name: 'FUSIONTRAK_INT_EVENTOS',
})
export class FusionEventModel {
  @PrimaryColumn()
  ID_PK: number

  @Column()
  TIPO: string

  @Column()
  DATAHORA: Date

  @Column()
  SEQ_PEDIDO_ERP: string
}
