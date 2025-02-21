import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCATIVI')
export class ActivityModel {
  @PrimaryColumn()
  CODATIV: number

  @Column()
  RAMO: string
}
