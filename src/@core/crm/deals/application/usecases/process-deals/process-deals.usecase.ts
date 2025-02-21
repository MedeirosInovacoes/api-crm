import { env } from '@/@core/@shared/infra/env'
import { CrmFilterInputOperatorEnum } from '@/@core/crm/@shared/application/enum/filter-input.enum'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { UpdateBatchDealsLeadRetrievalInputDto } from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/update-batch-deals-lead-retrieval/update-batch-deals-lead-retrieval.dto'
import { UpdateBatchDealsLeadRetrievalUseCase } from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/update-batch-deals-lead-retrieval/update-batch-deals-lead-retrieval.usecase'
import { CreateBatchDealsRecurrentsInputDto } from '@/@core/crm/deals/application/usecases/pipelines/recurrents/create-batch-deals-recurrents/create-batch-recurrents.dto'
import { UpdateBatchDealsRecurrentsInputDto } from '@/@core/crm/deals/application/usecases/pipelines/recurrents/update-batch-deals-recurrents/update-batch-deals-recurrents.dto'
import { UpdateBatchDealsRecurrentsUseCase } from '@/@core/crm/deals/application/usecases/pipelines/recurrents/update-batch-deals-recurrents/update-batch-deals-recurrents.usecase'
import { UpdateBatchDealsSalesInputDto } from '@/@core/crm/deals/application/usecases/pipelines/sales/update-batch-deals-sales/update-batch-deals-sales.dto'
import { UpdateBatchDealsSalesUseCase } from '@/@core/crm/deals/application/usecases/pipelines/sales/update-batch-deals-sales/update-batch-deals-sales.usecase'
import { ProcessDealsOutputDto } from '@/@core/crm/deals/application/usecases/process-deals/process-deals.dto'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'
import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export class ProcessDealsUseCase {
  newsCustomers: UpdateBatchDealsSalesInputDto = []
  dealsLeadRetrieval: UpdateBatchDealsLeadRetrievalInputDto = []
  dealsRecurrents: UpdateBatchDealsRecurrentsInputDto = []
  dealsRecurrentsCreate: CreateBatchDealsRecurrentsInputDto = []

  constructor(
    private readonly dealRepository: DealGateway,
    private readonly productsFacade: ProductFacade,
    private readonly companyFacade: CompanyFacade,
    private readonly customerFacade: CustomerFacade,
    private readonly updateBatchDealsLeadRetrievalUseCase: UpdateBatchDealsLeadRetrievalUseCase,
    private readonly updateBatchDealsRecurrentsUseCase: UpdateBatchDealsRecurrentsUseCase,
    private readonly updateBatchDealsSalesUseCase: UpdateBatchDealsSalesUseCase,
  ) {}

  execute = async (): Promise<ProcessDealsOutputDto> => {
    const { companies, customers, deals, products } = await this.fetchData()

    for (const customer of customers) {
      const company = companies.find((company) => +company.customerCode === customer.customerCode)

      const deal = deals.find(
        ({ customerCode, closeDate }) => customerCode === customer.customerCode && !closeDate,
      )

      const order = deal?.noteNumber
        ? customer.orders.find((order) => +order.orderCode === +deal.orderNumber)
        : customer.orders[0]

      if (company && deal && order) {
        const object = { name: customer.name, limit: customer.limit, order, deal, products }

        if (
          deal.stage !== env.RECURRENTS_PIPELINE_DONE_DEAL_ID &&
          deal.pipelineId === env.RECURRENTS_PIPELINE_ID
        ) {
          this.dealsRecurrents.push(object)
        }

        if (
          deal.pipelineId === env.NEWS_CUSTOMERS_PIPELINE_ID &&
          deal.stage != env.NEWS_CUSTOMERS_PIPELINE_DONE_DEAL_ID &&
          deal.stage != env.NEWS_CUSTOMERS_PIPELINE_AFTER_SALES_ID &&
          deal.stage != env.NEWS_CUSTOMERS_PIPELINE_LOST_BUSINESS_ID &&
          deal.stage != env.NEWS_CUSTOMERS_PIPELINE_DISQUALIFIED_ID
        ) {
          this.newsCustomers.push(object)
        }

        if (
          deal.stage !== env.LEAD_RETRIEVAL_PIPELINE_DONE_DEAL_ID &&
          deal.pipelineId === env.LEAD_RETRIEVAL_PIPELINE_ID
        ) {
          this.dealsLeadRetrieval.push(object)
        }
      } else if (customer.orders.length) {
        const hasDeal = deals?.find((deal) => +deal?.noteNumber === +customer.orders[0].noteCode)

        if (!hasDeal) {
          this.dealsRecurrentsCreate.push({
            companies,
            customer,
            deal,
            products,
          })
        }
      }
    }

    await this.updateBatchDealsLeadRetrievalUseCase.execute(this.dealsLeadRetrieval)
    await this.updateBatchDealsSalesUseCase.execute(this.newsCustomers)
    // await this.updateBatchDealsRecurrentsUseCase.execute(dealsRecurrents)
    // await this.createDealsRecurrentsUseCase.execute(dealsRecurrentsCreate, companies)
  }

  private fetchData = async (): Promise<FetchDataOutput> => {
    const customers: CustomerEntity[] = []

    const deals = await this.dealRepository.findAll({
      filter: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'closedate',
                operator: CrmFilterInputOperatorEnum.NotHasProperty,
              },
            ],
          },
        ],
      },
    })
    const products = await this.productsFacade.findAll()

    const companies = await this.companyFacade.findAll({
      filters: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'customer_code',
                operator: CrmFilterInputOperatorEnum.HasProperty,
              },
            ],
          },
        ],
      },
    })

    const customersCode = deals.map((deal) => deal.customerCode)

    const customersCodeChunks = SplitArrayIntoChunksUtil.splitArrayIntoChunks(customersCode, 1000)

    for (const chunk of customersCodeChunks) {
      const output = await this.customerFacade.findAllAndOrders({
        customersCode: chunk,
      })

      customers.push(...output)
    }

    return { customers, deals, products, companies }
  }
}

type FetchDataOutput = {
  customers: CustomerEntity[]
  deals: DealEntity[]
  products: ProductEntity[]
  companies: CompanyEntity[]
}
