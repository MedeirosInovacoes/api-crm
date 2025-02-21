import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCSUPERV')
export class SupervisorModel {
  @PrimaryColumn()
  CODSUPERVISOR: number

  @Column()
  NOME: string
}
