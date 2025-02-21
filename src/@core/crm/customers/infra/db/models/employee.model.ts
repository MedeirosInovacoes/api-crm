import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCEMPR')
export class EmployeeModel {
  @PrimaryColumn()
  MATRICULA: number

  @Column()
  NOME: string

  @Column()
  DT_EXCLUSAO: Date

  @Column()
  SITUACAO: string
}
