import { ActivityModel } from '@/@core/crm/customers/infra/db/models/activity.model'
import { BranchModel } from '@/@core/crm/customers/infra/db/models/branch.model'
import { NetworkModel } from '@/@core/crm/customers/infra/db/models/network.model'
import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'
import { SquareModel } from '@/@core/crm/customers/infra/db/models/square.model'
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

@Entity('PCCLIENT')
export class CustomerModel {
  @OneToMany(() => OrderModel, (order) => order.client)
  orders: OrderModel[]

  @OneToOne(() => SquareModel)
  @JoinColumn({ name: 'CODPRACA', referencedColumnName: 'CODPRACA' })
  square: SquareModel

  @OneToOne(() => BranchModel)
  @JoinColumn({ name: 'CODFILIALNF', referencedColumnName: 'CODIGO' })
  billingBranch: BranchModel

  @OneToOne(() => ActivityModel)
  @JoinColumn({ name: 'CODATV1', referencedColumnName: 'CODATIV' })
  activity: ActivityModel

  @OneToOne(() => NetworkModel)
  @JoinColumn({ name: 'CODREDE', referencedColumnName: 'CODREDE' })
  network: NetworkModel

  /** *
   * CÓDIGO DO CLIENTE
   */
  @PrimaryColumn()
  CODCLI: number

  @Column()
  CODCLIPRINC: number

  /** *
   * NOME DO CLIENTE
   */
  @Column()
  CLIENTE: string

  /** *
   * REDE DE CLIENTE
   */
  @Column()
  CODREDE: number

  /** *
   * FANTASIA
   */
  @Column()
  FANTASIA: string

  /** *
   * Limite de crédito
   */
  @Column()
  LIMCRED: string

  /** *
   * CNPJ/CPF
   */
  @Column()
  CGCENT: string

  /** *
   * INSCRIÇÃO ESTADUAL
   */
  @Column()
  IEENT: string

  /** *
   * RAMO DE ATIVIDADE
   */
  @Column()
  CODATV1: number

  /** *
   * CLASSIFICAÇÃO
   */
  @Column()
  VIP: string

  /** *
   * CÓDIGO DA PRAÇA
   */
  @Column()
  CODPRACA: number

  /** *
   * CÓDIGO DA FILIAL DE FATURAMENTO
   */
  @Column()
  CODFILIALNF: string

  /** *
   * TIPO DE PESSOA
   */
  @Column()
  TIPOFJ: string

  /** *
   * CÓDIGO COBRANÇA
   */
  @Column()
  CODCOB: string

  /** *
   * OBSERVAÇÃO
   */
  @Column()
  OBS: string

  /** *
   * DATA DA ÚLTIMA COMPRA
   */
  @Column()
  DTULTCOMP: Date

  /** *
   * DATA DA EXCLUSÃO
   */
  @Column()
  DTEXCLUSAO: Date

  /** *
   * ENDEREÇO ENTREGA
   */
  @Column()
  ENDERENT: string

  @Column()
  CODUSUR1: number

  /** *
   * BAIRRO ENTREGA
   */
  @Column()
  BAIRROENT: string

  /** *
   * MUNINCIPÍO ENTREGA
   */
  @Column()
  MUNICENT: string

  /** *
   * ESTADO ENTREGA
   */
  @Column()
  ESTENT: string

  /** *
   * CEP ENTREGA
   */
  @Column()
  CEPENT: string

  /** *
   * TELEFONE ENTREGA
   */
  @Column()
  TELENT: string

  /** *
   * TELEFONE CELULAR ENTREGA
   */
  @Column()
  TELCELENT: string

  /** *
   * COMPLEMENTO ENTREGA
   */
  @Column()
  COMPLEMENTOENT: string

  /** *
   * EMAIL
   */
  @Column()
  EMAIL: string

  /** *
   * SITE
   */
  @Column()
  SITE: string

  /** *
   * SITE
   */
  @Column()
  EMAILNFE: string

  @Column()
  DTULTALTER: Date

  @Column()
  DTBLOQ: Date

  @Column()
  BLOQUEIO: string

  @Column()
  DTPRIMCOMPRA: Date

  @Column()
  DTCADASTRO: Date

  @Column()
  OBS2: string
}
