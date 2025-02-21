import { CustomerLimitInterface } from '@/@core/crm/customers/application/interfaces/customer.interface'
import { CustomerModel } from '@/@core/crm/customers/infra/db/models/customer.model'
import { ShowCustomerLimitRepositoryQueryResponse } from '@/@core/crm/customers/infra/db/interfaces/customer.interface'
import { CustomerLimitInfraMapper } from '@/@core/crm/customers/infra/db/mappers/customer-limit/customer-limitmapper.dto.infra'
import { startOfMonth } from 'date-fns'
import { Repository } from 'typeorm'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { CustomerInfraMapper } from '@/@core/crm/customers/infra/db/mappers/customer/customer-infra.mapper'
import { OrderModel } from '@/@core/crm/customers/infra/db/models/order.model'
import { OrderEntity } from '@/@core/crm/customers/domain/entities/order/order.entity'
import { OrderInfraMapper } from '@/@core/crm/customers/infra/db/mappers/customer/order-infra.mapper'
import * as xlsx from 'xlsx'
import { ChannelFromFile } from '@/@core/crm/customers/infra/db/mappers/customer/customer-infra.mapper.dto'
import { temporaryCustomersCode } from '@/@core/crm/customers/infra/db/repository/temporary-customers'
import {
  CustomerGateway,
  FindAllCustomersFilter,
} from '@/@core/crm/customers/domain/gateway/customer/customer.gateway'
import { FindAllCustomersLeadsRetrievalOutput } from '@/@core/crm/customers/domain/gateway/customer/customer-gateway.dto'
import * as path from 'path'

export class CustomerDataBaseRepository implements CustomerGateway {
  constructor(
    private readonly repository?: Repository<CustomerModel>,
    private readonly orderRepository?: Repository<OrderModel>,
  ) {}

  findAllLeadsRetrieval = async (): Promise<FindAllCustomersLeadsRetrievalOutput> => {
    const channels = this.readChannelsFromFile()
    const limits = await this.findAllLimits()
    const nonPayments = await this.findAllNonPayments()

    const query = this.repository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.square', 'square')
      .leftJoinAndSelect('customer.activity', 'activity')
      .leftJoinAndSelect('customer.network', 'network')
      .leftJoinAndSelect('customer.billingBranch', 'billingBranch')
      .where(
        `
        customer.DTEXCLUSAO IS NULL 
        AND customer.LIMCRED > 0 
        AND customer.TIPOFJ = 'J'
        AND ((TRUNC(customer.DTULTCOMP) >= TRUNC(SYSDATE) - 60 AND TRUNC(customer.DTULTCOMP) <= TRUNC(SYSDATE) - 45)
          OR 
          (customer.DTULTCOMP IS NULL AND TRUNC(customer.DTCADASTRO) >= TRUNC(SYSDATE) - 10))
        `,
      )

    const response = await query.getMany()

    const result = response
      .filter(
        (customer) => !nonPayments.find((nonPayment) => nonPayment.codcli === customer.CODCLI),
      )
      .map((customer) => CustomerInfraMapper.toDomain({ customer, limits, channels }))

    return result
  }

  async findAllLimits(): Promise<CustomerLimitInterface[]> {
    const response: ShowCustomerLimitRepositoryQueryResponse[] = await this.repository.query(`
      SELECT 
          codcli, 
          limite, 
          limite - valorusado creditodisponivel,
          codcob
      FROM (
          SELECT 
              c.codcli,
              c.cliente,
              c.limcred,
              c.codcob,
              NVL (
                (SELECT SUM (valor)
                  FROM dmedeiro.pcprest
                  WHERE 
                    dtpag IS NULL
                    AND codcob NOT IN
      ('DESD', 'CANC', 'BNF', 'ESTR', 'BNFT', 'BNFP')
      AND codcli IN
      (SELECT codcli
      FROM dmedeiro.pcclient
      WHERE codcliprinc =
      (SELECT codcliprinc
      FROM dmedeiro.pcclient
      WHERE codcli = c.codcli))),
      0)
      valorusado,
      (SELECT SUM (
      limcred
      * (  1
      + (SELECT NVL (perexcedelimcred, 0) / 100
      FROM dmedeiro.pcconsum)))
      FROM dmedeiro.pcclient
      WHERE codcli IN
      (SELECT codcli
      FROM dmedeiro.pcclient
      WHERE codcliprinc = (SELECT codcliprinc
      FROM dmedeiro.pcclient
      WHERE codcli = c.codcli))) limite FROM dmedeiro.pcclient c WHERE c.dtexclusao IS NULL)
      dados WHERE limite > 0
   `)

    return response.map((limit) => CustomerLimitInfraMapper.toDomain({ limit }).limit)
  }

  async findAll(filter?: FindAllCustomersFilter): Promise<CustomerEntity[]> {
    const channels = this.readChannelsFromFile()

    const firstDay = startOfMonth(new Date())

    const limits = await this.findAllLimits()

    const query = this.repository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.square', 'square')
      .leftJoinAndSelect('customer.activity', 'activity')
      .leftJoinAndSelect('customer.network', 'network')
      .leftJoinAndSelect('customer.billingBranch', 'billingBranch')
      .orderBy('customer.CODCLIPRINC', 'DESC')

    if (filter?.orgin === 'Ecommerce') {
      query.where('customer.CODUSUR1 = 1 and customer.DTEXCLUSAO IS NULL')
    } else {
      query.where(
        'customer.CODCLI in (:...temporaryCustomersCode)and customer.DTEXCLUSAO IS NULL',
        {
          temporaryCustomersCode:
            filter?.customersCode?.length > 0 ? filter?.customersCode : temporaryCustomersCode,
        },
      )
    }

    if (filter?.mostRecentOrder) {
      query
        .leftJoinAndSelect(
          'customer.orders',
          'order',
          "order.POSICAO = 'F' AND order.NUMPED = (SELECT MAX(o.NUMPED) FROM PCPEDC o WHERE o.CODCLI = customer.CODCLI AND TRUNC(o.DTFAT) = TRUNC(SYSDATE))",
        )
        .leftJoinAndSelect('order.orderItems', 'orderItem')
        .leftJoinAndSelect('order.supervisor', 'supervisor')
        .leftJoinAndSelect('order.sales', 'sales')
        .leftJoinAndSelect('order.paymentPlan', 'paymentPlan')
    } else {
      query.leftJoinAndSelect('customer.orders', 'order', 'TRUNC(order.DTFAT) >= :date', {
        date: firstDay,
      })
    }

    const response = await query.getMany()

    return response.map((customer) => CustomerInfraMapper.toDomain({ customer, limits, channels }))
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('order.supervisor', 'supervisor')
      .leftJoinAndSelect('order.sales', 'sales')
      .leftJoinAndSelect('order.paymentPlan', 'paymentPlan')
      .where('order.CODCLI in (:...temporaryCustomersCode)', {
        temporaryCustomersCode,
      })
      .andWhere("order.POSICAO = 'L'")
      .andWhere('TRUNC(order.DATA) = TRUNC(SYSDATE)')
      .andWhere('order.DTFAT IS NULL')
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('MAX(o.NUMPED)', 'MAX_NUMPED')
          .from(OrderModel, 'o')
          .where('o.CODCLI = order.CODCLI')
          .andWhere("o.POSICAO = 'L'")
          .andWhere('TRUNC(o.DATA) = TRUNC(SYSDATE)')
          .andWhere('o.DTFAT IS NULL')
          .getQuery()

        return 'order.NUMPED = (' + subQuery + ')'
      })

    const response = await query.getMany()

    return response.map(OrderInfraMapper.toDomain)
  }

  private readChannelsFromFile = (): ReadChannelsFromFileOutput => {
    const workbook = xlsx.readFile(path.resolve(__dirname, '../files/channels.xlsx'))

    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    const data = xlsx.utils.sheet_to_json(worksheet)

    return data.map((item) => ({
      channelName: item['Ramo']?.trim(),
      activityCode: item['cod'],
      activityName: item['Drill Ramo de Atividade']?.trim(),
    }))
  }

  private findAllNonPayments = async (): Promise<FindAllNonPaymentsOutput> => {
    const response: FindAllNonPaymentsOutput = await this.repository.query(`
        SELECT 
            UNIQUE p.codcli AS "codcli"
        FROM 
            pcprest p
        LEFT JOIN 
            pccob b ON p.codcob = b.codcob
        LEFT JOIN 
            pcclient c ON c.codcli = p.codcli
        LEFT JOIN 
            pcempr e ON p.codbaixa = e.matricula
        LEFT JOIN 
            pcusuari u ON p.codusur = u.codusur
        LEFT JOIN 
            pcbanco a ON p.codbanco = a.codbanco
        LEFT JOIN 
            pcfilial f ON p.codfilial = f.codigo
        LEFT JOIN 
            pcsuperv s ON p.codsupervisor = s.codsupervisor
        WHERE 
            p.codcob NOT IN ('DEVT', 'DEVP', 'CANC', 'DESD', 'DESC', 'ESTR', 'D', 'CAR', 'BNF', 'BNFT')
            AND TRUNC(p.dtvenc) <= TRUNC(SYSDATE) -1
            AND p.dtpag IS NULL
            AND c.dtexclusao IS NULL
    `)

    return response
  }
}

type ReadChannelsFromFileOutput = ChannelFromFile[]

type FindAllNonPaymentsOutput = {
  codcli: number
}[]
