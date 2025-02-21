import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCDEPTO')
export class DepartmentModel {
  @PrimaryColumn({ name: 'CODEPTO' })
  id: number

  @Column({ name: 'DESCRICAO' })
  descricao: string
}
