import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCEST')
export class StockModel {
  @PrimaryColumn()
  CODPROD: number

  @Column()
  CODFILIAL: number

  @Column()
  QTESTGER: number

  @Column()
  QTINDENIZ: number

  @Column()
  QTRESERV: number
}
