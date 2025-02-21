import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('PCFORNEC')
export class SupplierModel {
  @PrimaryColumn({ name: 'CODFORNEC' })
  id: number

  @Column({ name: 'FORNECEDOR' })
  descricao: string
}
