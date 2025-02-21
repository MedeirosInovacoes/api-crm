import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'

export type CheckBatchDealsLeadRetrievalCompanyReactivationProps = {
  dealRepository: DealGateway
  companyFacade: CompanyFacade
  customerFacade: CustomerFacade
}

export type CheckBatchDealsLeadRetrievalCompanyReactivationDataProps = {
  dealstage: string
}
