import { DepartmentModel } from '@/@core/crm/customers/infra/db/models/department.model'
import { SectionModel } from '@/@core/crm/customers/infra/db/models/section.model'
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

@Entity('PCPRODUT')
export class ProductModel {
  @OneToOne(() => SectionModel)
  @JoinColumn({ name: 'CODSEC', referencedColumnName: 'id' })
  section: SectionModel

  @OneToOne(() => DepartmentModel)
  @JoinColumn({ name: 'CODEPTO', referencedColumnName: 'id' })
  department: DepartmentModel

  @OneToOne(() => SectionModel)
  @JoinColumn({ name: 'CODFORNEC', referencedColumnName: 'id' })
  supplier: SectionModel

  @OneToOne(() => ProductModel)
  @JoinColumn({ name: 'CODPROD', referencedColumnName: 'id' })
  product_price: ProductModel

  @PrimaryColumn({ name: 'CODPROD' })
  id: number

  @Column({ name: 'DESCRICAO' })
  descricao: string

  @Column({ name: 'DTEXCLUSAO' })
  dtExclusao: Date

  @Column({ name: 'DTULTALTER' })
  dtUltimaAlteracao: Date

  @Column({ name: 'DTULTALTCOM' })
  dataUltimaAlteracaoComercial: Date

  @Column({ name: 'DTCADASTRO' })
  dtCadastro: Date

  @Column({ name: 'EMBALAGEM' })
  embalagem: string

  @Column({ name: 'UNIDADE' })
  unidade: string

  @Column({ name: 'PESOLIQ' })
  pesoLiquido: number

  @Column({ name: 'PESOBRUTO' })
  pesoBruto: number

  @Column({ name: 'QTUNIT' })
  quantiadeUnidade: number

  @Column({ name: 'VLBONIFIC' })
  valorBonificado: number

  @Column({ name: 'OBS2' })
  obs2: string

  @Column({ name: 'UNIDADEMASTER' })
  unidadeMaster: string
}
