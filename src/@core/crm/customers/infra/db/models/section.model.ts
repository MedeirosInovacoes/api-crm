import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCSECAO')
export class SectionModel {
  @PrimaryColumn({ name: 'CODSEC' })
  id: number

  @Column({ name: 'DESCRICAO' })
  descricao: string
}
