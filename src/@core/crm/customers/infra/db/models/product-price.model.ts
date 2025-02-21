import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCTABPR')
export class ProductPriceModel {
  @PrimaryColumn({ name: 'CODPROD' })
  id: number

  @Column('decimal', { name: 'PTABELA', scale: 2 })
  precoTabela: number
}
