import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { CheckLastOrderReleasedUseCase } from '@/@core/crm/deals/application/usecases/check-last-order-released/check-last-order-released.usecase'
import { FindAllDealsPipelinesUseCase } from '@/@core/crm/deals/application/usecases/find-all-deals-pipelines/find-all-deals-pipelines.usecase'
import { CheckBatchDealsLeadRetrievalCompanyReactivationUseCase } from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/check-company-reactivation/check-company-reactivation.usecase'
import { UpdateBatchDealsLeadRetrievalUseCase } from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/update-batch-deals-lead-retrieval/update-batch-deals-lead-retrieval.usecase'
import { CreateBatchDealsRecurrentsUseCase } from '@/@core/crm/deals/application/usecases/pipelines/recurrents/create-batch-deals-recurrents/create-batch-recurrents.usecase'
import { UpdateBatchDealsRecurrentsUseCase } from '@/@core/crm/deals/application/usecases/pipelines/recurrents/update-batch-deals-recurrents/update-batch-deals-recurrents.usecase'
import { UpdateBatchDealsSalesUseCase } from '@/@core/crm/deals/application/usecases/pipelines/sales/update-batch-deals-sales/update-batch-deals-sales.usecase'
import { ProcessDealsUseCase } from '@/@core/crm/deals/application/usecases/process-deals/process-deals.usecase'
import { UpdateAllDeliveryDatesUseCase } from '@/@core/crm/deals/application/usecases/update-all-delivery-dates/update-all-delivery-dates.usecase'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'
import { FusionFacade } from '@/@core/fusion/application/facades/fusion.facade'
import { COMPANIES_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/companies/companies.facade.provider'
import { CUSTOMERS_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.facade.provider'
import { CUSTOMERS_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/customers/customers.repository.provider'
import { DEAL_REPOSITORIES_PROVIDERS } from '@/nest-modules/crm-module/providers/deals/deal.repository.provider'
import { PRODUCTS_FACADE_PROVIDERS } from '@/nest-modules/crm-module/providers/products/products.facade.provider'
import { FUSION_FACADE_PROVIDERS } from '@/nest-modules/fusion-module/providers/fusion.facade.provider'

const checkBatchCheckBatchDealsLeadRetrievalCompanyReactivationUseCase = {
  provide: CheckBatchDealsLeadRetrievalCompanyReactivationUseCase,
  useFactory: (
    dealRepository: DealGateway,
    companyFacade: CompanyFacade,
    customerFacade: CustomerFacade,
  ) => {
    return new CheckBatchDealsLeadRetrievalCompanyReactivationUseCase({
      dealRepository,
      companyFacade,
      customerFacade,
    })
  },
  inject: [
    DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide,
    COMPANIES_FACADE_PROVIDERS.COMPANY_FACADE_FACTORY.provide,
    CUSTOMERS_REPOSITORY_PROVIDERS.CUSTOMER_DATABASE_REPOSITORY.provide,
  ],
}

const checkLastOrderReleasedUseCase = {
  provide: CheckLastOrderReleasedUseCase,
  useFactory: (
    customerFacade: CustomerFacade,
    dealRepository: DealGateway,
    productFacade: ProductFacade,
    companyFacade: CompanyFacade,
  ) =>
    new CheckLastOrderReleasedUseCase(customerFacade, companyFacade, productFacade, dealRepository),
  inject: [
    CUSTOMERS_FACADE_PROVIDERS.CUSTOMER_FACADE.provide,
    DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide,
    PRODUCTS_FACADE_PROVIDERS.PRODUCT_FACADE.provide,
    COMPANIES_FACADE_PROVIDERS.COMPANY_FACADE_FACTORY.provide,
  ],
}

const updateBatchDealsLeadRetrievalUseCase = {
  provide: UpdateBatchDealsLeadRetrievalUseCase,
  useFactory: (dealRepository: DealGateway) => {
    return new UpdateBatchDealsLeadRetrievalUseCase(dealRepository)
  },
  inject: [DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide],
}

const createBatchDealsRecurrentsUseCase = {
  provide: CreateBatchDealsRecurrentsUseCase,
  useFactory: (dealRepository: DealGateway) => {
    return new CreateBatchDealsRecurrentsUseCase(dealRepository)
  },
  inject: [DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide],
}

const updateBatchDealsRecurrentsUseCase = {
  provide: UpdateBatchDealsRecurrentsUseCase,
  useFactory: (dealRepository: DealGateway) => {
    return new UpdateBatchDealsRecurrentsUseCase(dealRepository)
  },
  inject: [DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide],
}

const updateBatchDealsSales = {
  provide: UpdateBatchDealsSalesUseCase,
  useFactory: (dealRepository: DealGateway) => {
    return new UpdateBatchDealsSalesUseCase(dealRepository)
  },
  inject: [DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide],
}

const processDealsUseCase = {
  provide: ProcessDealsUseCase,
  useFactory: (
    dealRepository: DealGateway,
    productsFacade: ProductFacade,
    companyFacade: CompanyFacade,
    customerFacade: CustomerFacade,
    updateBatchDealsLeadRetrievalUseCase: UpdateBatchDealsLeadRetrievalUseCase,
    updateBatchDealsRecurrentsUseCase: UpdateBatchDealsRecurrentsUseCase,
    updateBatchDealsNewsCustomers: UpdateBatchDealsSalesUseCase,
  ) => {
    return new ProcessDealsUseCase(
      dealRepository,
      productsFacade,
      companyFacade,
      customerFacade,
      updateBatchDealsLeadRetrievalUseCase,
      updateBatchDealsRecurrentsUseCase,
      updateBatchDealsNewsCustomers,
    )
  },
  inject: [
    DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide,
    PRODUCTS_FACADE_PROVIDERS.PRODUCT_FACADE.provide,
    COMPANIES_FACADE_PROVIDERS.COMPANY_FACADE_FACTORY.provide,
    CUSTOMERS_FACADE_PROVIDERS.CUSTOMER_FACADE.provide,
    updateBatchDealsLeadRetrievalUseCase.provide,
    updateBatchDealsRecurrentsUseCase.provide,
    updateBatchDealsSales.provide,
  ],
}

const updateAllDeliveryDatesUseCase = {
  provide: UpdateAllDeliveryDatesUseCase,
  useFactory: (dealRepository: DealGateway, fusionFacade: FusionFacade) => {
    return new UpdateAllDeliveryDatesUseCase(dealRepository, fusionFacade)
  },
  inject: [
    DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide,
    FUSION_FACADE_PROVIDERS.FUSION_FACADE.provide,
  ],
}

export const findAllDealsPipelinesUseCase = {
  provide: FindAllDealsPipelinesUseCase,
  useFactory: (dealRepository: DealGateway) => {
    return new FindAllDealsPipelinesUseCase({ dealRepository })
  },
  inject: [DEAL_REPOSITORIES_PROVIDERS.DEAL_REPOSITORY.provide],
}

export const DEAL_USECASES_PROVIDERS = {
  CHECK_BATCH_COMPANY_REACTIVATION_USE_CASE:
    checkBatchCheckBatchDealsLeadRetrievalCompanyReactivationUseCase,
  CHECK_LAST_ORDER_RELEASED_USE_CASE: checkLastOrderReleasedUseCase,
  UPDATE_BATCH_DEALS_LEAD_RETRIEVAL_USE_CASE: updateBatchDealsLeadRetrievalUseCase,
  CREATE_BATCH_DEALS_RECURRENTS_USE_CASE: createBatchDealsRecurrentsUseCase,
  UPDATE_BATCH_DEALS_RECURRENTS_USE_CASE: updateBatchDealsRecurrentsUseCase,
  UPDATE_BATCH_DEALS_SALES: updateBatchDealsSales,
  PROCESS_DEALS_USE_CASE: processDealsUseCase,
  UPDATE_ALL_DELIVERY_DATES_USE_CASE: updateAllDeliveryDatesUseCase,
  FIND_ALL_DEALS_PIPELINES: findAllDealsPipelinesUseCase,
}
