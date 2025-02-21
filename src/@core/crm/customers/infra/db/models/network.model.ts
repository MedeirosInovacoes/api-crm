import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCREDECLIENTE')
export class NetworkModel {
  @PrimaryColumn()
  CODREDE: number

  @Column()
  DESCRICAO: string
}
