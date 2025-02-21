import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCFILIAL')
export class BranchModel {
  @PrimaryColumn()
  CODIGO: number

  @Column()
  CIDADE: string
}
