import { env } from '@/@core/@shared/infra/env'
import {
  AssociationCrmObjectWithFromDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'
import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { DealCrmBuilderOutputDto } from '@/@core/crm/deals/domain/entities/deal-crm.build'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'
import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'

export class CheckLastOrderReleasedUseCase {
  constructor(
    private readonly customerFacade: CustomerFacade,
    private readonly companyFacade: CompanyFacade,
    private readonly productFacade: ProductFacade,
    private readonly dealRepository: DealGateway,
  ) {}

  async execute() {
    let data: UpdateCrmObjectDto<DealCrmBuilderOutputDto>[] = []
    const associations: AssociationCrmObjectWithFromDto[] = []
    const [orders, deals, products] = await Promise.all([
      this.customerFacade.findAllOrders(),
      this.dealRepository.findAll(),
      this.productFacade.findAll(),
    ])

    for (const [index, deal] of deals.entries()) {
      const order = orders.find(({ customerCode }) => customerCode == deal?.customerCode)

      if (order) {
        order.items?.forEach((orderItem) => {
          const product = products.find((product) => +product.productCode === orderItem.productCode)

          if (!!product) {
            associations.push({
              from: { id: deal.id },
              to: { id: product.id },
              types: [
                {
                  category: AssociationTypeEnum.CRM_DEFINED,
                  typeId: 630,
                },
              ],
            })
          }
        })

        const newDeal = DealEntity.create(
          {
            companyId: deal.id,
            pipelineId: deal.pipelineId,
            stage: deal.stage,
            name: deal.name,
            customerCode: deal?.customerCode,
            amount: order?.amount && +order?.amount,
            loadNumber: order?.loadCode,
            orderNumber: order?.orderCode,
            noteNumber: order?.noteCode,
            billingDate: order?.billingDate,
            deliveryDate: order?.deliveryDate,
            date: order?.date,
            branchCode: order?.branchCode,
            mediumTerm: order?.mediumTerm,
            quantityItems: order?.quantityItems,
            middleOrder: order?.middleOrder,
            paymentPlanCode: order?.paymentPlanCode,
            paymentPlanDescription: order?.paymentPlanDescription,
            salesCode: order?.salesCode,
            salesDescription: order?.salesDescription,
            salesTransactionCode: order?.salesTransactionCode,
            supervisorCode: order?.supervisorCode,
            supervisorDescription: order?.supervisorDescription,
            totalWeight: order?.totalWeight,
            valueServed: order?.valueServed,
            bonusValue: order?.bonusValue,
          },
          deal.id,
        )

        if (
          newDeal.pipelineId === env.LEAD_RETRIEVAL_PIPELINE_ID &&
          newDeal.stage !== env.LEAD_RETRIEVAL_PIPELINE_AWAITING_BILLING_ID &&
          newDeal.stage !== env.LEAD_RETRIEVAL_PIPELINE_DONE_DEAL_ID &&
          newDeal.stage !== env.LEAD_RETRIEVAL_PIPELINE_AFTER_SALES_ID &&
          newDeal.stage !== env.LEAD_RETRIEVAL_PIPELINE_LOST_BUSINESS_ID
        ) {
          newDeal.changeStage(env.LEAD_RETRIEVAL_PIPELINE_AWAITING_BILLING_ID)

          data.push({
            id: newDeal.id,
            data: newDeal.toCrm(),
            associations,
          })
        }

        if (
          newDeal.pipelineId == env.NEWS_CUSTOMERS_PIPELINE_ID &&
          newDeal.stage != env.NEWS_CUSTOMERS_PIPELINE_AWAITING_BILLING_ID &&
          newDeal.stage != env.NEWS_CUSTOMERS_PIPELINE_DONE_DEAL_ID &&
          newDeal.stage != env.NEWS_CUSTOMERS_PIPELINE_AFTER_SALES_ID &&
          newDeal.stage != env.NEWS_CUSTOMERS_PIPELINE_LOST_BUSINESS_ID &&
          newDeal.stage != env.NEWS_CUSTOMERS_PIPELINE_DISQUALIFIED_ID
        ) {
          newDeal.changeStage(env.NEWS_CUSTOMERS_PIPELINE_AWAITING_BILLING_ID)

          data.push({
            id: newDeal.id,
            data: newDeal.toCrm(),
            associations,
          })
        }
      }

      if (data.length === 100 || deals.length === index + 1) {
        await this.dealRepository.updateBatch(data)
        data = []
      }
    }
  }
}
