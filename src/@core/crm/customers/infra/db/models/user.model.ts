import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCUSUARI')
export class UserModel {
  @PrimaryColumn()
  CODUSUR: number

  @Column()
  NOME: string
}
