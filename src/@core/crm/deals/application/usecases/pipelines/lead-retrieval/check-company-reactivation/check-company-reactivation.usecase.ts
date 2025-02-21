import { env } from '@/@core/@shared/infra/env'
import { UpdateCrmObjectDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import { CheckCreditApprovalUsecase } from '@/@core/crm/deals/application/usecases/check-credit-approval/check-credit-approval.usecase'
import {
  CheckBatchDealsLeadRetrievalCompanyReactivationDataProps,
  CheckBatchDealsLeadRetrievalCompanyReactivationProps,
} from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/check-company-reactivation/check-company-reactivation.dto'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

export class CheckBatchDealsLeadRetrievalCompanyReactivationUseCase {
  private _data: UpdateCrmObjectDto<CheckBatchDealsLeadRetrievalCompanyReactivationDataProps>[] = []

  constructor(private props: CheckBatchDealsLeadRetrievalCompanyReactivationProps) {}

  get data() {
    return this._data
  }

  execute = async () => {
    const { customers, companies, deals } = await this.fetchData()

    for (const customer of customers) {
      const company = companies.find((company) => +company.customerCode === +customer.customerCode)

      const deal = deals.find(({ companyId }) => companyId === company?.id)

      if (company && deal) {
        const { isApprovedWithCredit, isApprovedWithoutCredit } = CheckCreditApprovalUsecase.check({
          base: env.LEAD_RETRIEVAL_PIPELINE_REACTIVATION_BASE_ID,
          billingCode: customer.billingCode,
          creditLimit: +customer.limit,
          dealId: deal.id,
          dealStage: deal.stage,
          isActive: customer.isActive,
          lastPurchaseDate: customer.dateLastPurchase,
          reactivationDate: customer.reactivationDate,
        })

        if (isApprovedWithCredit) {
          deal.changeStage(env.LEAD_RETRIEVAL_PIPELINE_QUALIFIED_WITH_CREDIT_ID)
          this._data.push({ id: deal.id, data: { dealstage: deal.stage } })
        } else if (isApprovedWithoutCredit) {
          deal.changeStage(env.LEAD_RETRIEVAL_PIPELINE_QUALIFIED_WITHOUT_CREDIT_ID)
          this._data.push({ id: deal.id, data: { dealstage: deal.stage } })
        }
      }

      await this.handleProcessing()
    }
  }

  private handleProcessing = async () => {
    const chucksData = SplitArrayIntoChunksUtil.splitArrayIntoChunks(this.data, 100)

    for (const chuck of chucksData) {
      await this.props.dealRepository.updateBatch(chuck)
    }
  }

  private fetchData = async (): Promise<FetchDataOutput> => {
    const [customers, companies, deals] = await Promise.all([
      this.props.customerFacade.findAll(),
      this.props.companyFacade.findAll(),
      this.props.dealRepository.findAll(),
    ])

    return { customers, companies, deals }
  }
}

type FetchDataOutput = {
  customers: CustomerEntity[]
  companies: CompanyEntity[]
  deals: DealEntity[]
}
