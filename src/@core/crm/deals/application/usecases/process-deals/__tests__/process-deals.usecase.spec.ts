import { env } from '@/@core/@shared/infra/env'
import { CompanyFacade } from '@/@core/crm/companies/application/facades/company/company.facade'
import { CompanyFakeBuilder } from '@/@core/crm/companies/domain/builders/company/company-fake.builder'
import { CustomerFacade } from '@/@core/crm/customers/application/facades/customer/customer.facade'
import { CustomerFakeBuilder } from '@/@core/crm/customers/domain/fake-builders/customer-fake.builder'
import { OrderFakeBuilder } from '@/@core/crm/customers/domain/fake-builders/order-fake.builder'
import { UpdateBatchDealsLeadRetrievalUseCase } from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/update-batch-deals-lead-retrieval/update-batch-deals-lead-retrieval.usecase'
import { UpdateBatchDealsRecurrentsUseCase } from '@/@core/crm/deals/application/usecases/pipelines/recurrents/update-batch-deals-recurrents/update-batch-deals-recurrents.usecase'
import { UpdateBatchDealsSalesUseCase } from '@/@core/crm/deals/application/usecases/pipelines/sales/update-batch-deals-sales/update-batch-deals-sales.usecase'
import { ProcessDealsUseCase } from '@/@core/crm/deals/application/usecases/process-deals/process-deals.usecase'
import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'
import { DealGateway } from '@/@core/crm/deals/domain/deal.gateway'
import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'

describe('ProcessDealsUseCase unit tests', () => {
  let dealRepository: jest.Mocked<DealGateway>
  let productsFacade: jest.Mocked<ProductFacade>
  let companyFacade: jest.Mocked<CompanyFacade>
  let customerFacade: jest.Mocked<CustomerFacade>
  let updateBatchDealsLeadRetrievalUseCase: jest.Mocked<UpdateBatchDealsLeadRetrievalUseCase>
  let updateBatchDealsRecurrentsUseCase: jest.Mocked<UpdateBatchDealsRecurrentsUseCase>
  let updateBatchDealsSalesUseCase: jest.Mocked<UpdateBatchDealsSalesUseCase>

  let useCase: ProcessDealsUseCase

  beforeEach(() => {
    dealRepository = {
      findAll: jest.fn(),
      createBatch: jest.fn(),
      updateBatch: jest.fn(),
      update: jest.fn(),
      findOwnerById: jest.fn(),
    } as jest.Mocked<DealGateway>

    productsFacade = { findAll: jest.fn() } as unknown as jest.Mocked<ProductFacade>
    companyFacade = { findAll: jest.fn() } as unknown as jest.Mocked<CompanyFacade>
    customerFacade = { findAllAndOrders: jest.fn() } as unknown as jest.Mocked<CustomerFacade>
    updateBatchDealsLeadRetrievalUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateBatchDealsLeadRetrievalUseCase>
    updateBatchDealsRecurrentsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateBatchDealsRecurrentsUseCase>

    useCase = new ProcessDealsUseCase(
      dealRepository,
      productsFacade,
      companyFacade,
      customerFacade,
      updateBatchDealsLeadRetrievalUseCase,
      updateBatchDealsRecurrentsUseCase,
      updateBatchDealsSalesUseCase,
    )
  })

  // describe('DealsLeadRetrieval unit tests', () => {
  //   it('should correctly populate dealsLeadRetrieval and call corresponding use case', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCloseDate(null)
  //         .withCompanyId('1')
  //         .withOrderNumber(1)
  //         .withStage(env.LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.LEAD_RETRIEVAL_PIPELINE_ID)
  //         .withOrderItems([{ id: '1' }])
  //         .build(),
  //     ]
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(1).build()]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer()
  //         .withCustomerCode(1)
  //         .withOrders([OrderFakeBuilder.aOrder().withOrderCode(1).build()])
  //         .build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(1)
  //     expect(dealsLeadRetrieval[0]).toEqual({
  //       name: mockCustomers[0].name,
  //       limit: mockCustomers[0].limit,
  //       order: mockCustomers[0].orders[0],
  //       deal: mockDeals[0],
  //       products: mockProducts,
  //     })
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso closeDate exista', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCompanyId('1')
  //         .withOrderNumber(1)
  //         .withStage(env.LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.LEAD_RETRIEVAL_PIPELINE_ID)
  //         .withOrderItems([{ id: '1' }])
  //         .build(),
  //     ]
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(1).build()]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer()
  //         .withCustomerCode(1)
  //         .withOrders([OrderFakeBuilder.aOrder().withOrderCode(1).build()])
  //         .build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso pipelineId seja diferente de LEAD_RETRIEVAL_PIPELINE_ID', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCloseDate(null)
  //         .withCompanyId('1')
  //         .withOrderNumber(1)
  //         .withStage(env.LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.NEWS_CUSTOMERS_PIPELINE_DONE_DEAL_ID)
  //         .withOrderItems([{ id: '1' }])
  //         .build(),
  //     ]
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(1).build()]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer()
  //         .withCustomerCode(1)
  //         .withOrders([OrderFakeBuilder.aOrder().withOrderCode(1).build()])
  //         .build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso stage seja diferente de LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCloseDate(null)
  //         .withCompanyId('1')
  //         .withOrderNumber(1)
  //         .withStage(env.RECURRENTS_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.LEAD_RETRIEVAL_PIPELINE_ID)
  //         .withOrderItems([{ id: '1' }])
  //         .build(),
  //     ]
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(1).build()]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer()
  //         .withCustomerCode(1)
  //         .withOrders([OrderFakeBuilder.aOrder().withOrderCode(1).build()])
  //         .build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso não exista deal', async () => {
  //     const mockProducts = []
  //     const mockDeals = []
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(1).build()]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer()
  //         .withCustomerCode(1)
  //         .withOrders([OrderFakeBuilder.aOrder().withOrderCode(1).build()])
  //         .build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso não exista company', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCloseDate(null)
  //         .withCompanyId('1')
  //         .withOrderNumber(1)
  //         .withStage(env.LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.LEAD_RETRIEVAL_PIPELINE_ID)
  //         .withOrderItems([{ id: '1' }])
  //         .build(),
  //     ]
  //     const mockCompanies = [
  //       CompanyFakeBuilder.aCompany().withId('132').withCustomerCode(1).build(),
  //     ]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer()
  //         .withCustomerCode(1)
  //         .withOrders([OrderFakeBuilder.aOrder().withOrderCode(1).build()])
  //         .build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso não exista customer', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCloseDate(null)
  //         .withCompanyId('1')
  //         .withOrderNumber(1)
  //         .withStage(env.LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.LEAD_RETRIEVAL_PIPELINE_ID)
  //         .withOrderItems([{ id: '1' }])
  //         .build(),
  //     ]
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(4).build()]
  //     const mockCustomers = []

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })

  //   it('Deve retornar um array vazio de dealsLeadRetrieval caso não exista order', async () => {
  //     const mockProducts = []
  //     const mockDeals = [
  //       DealFakeBuilder.aDeal()
  //         .withCustomerCode(1)
  //         .withCloseDate(null)
  //         .withCompanyId('1')

  //         .withStage(env.LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID)
  //         .withPipelineId(env.LEAD_RETRIEVAL_PIPELINE_ID)
  //         .build(),
  //     ]
  //     const mockCompanies = [CompanyFakeBuilder.aCompany().withId('1').withCustomerCode(1).build()]
  //     const mockCustomers = [
  //       CustomerFakeBuilder.aCustomer().withCustomerCode(1).withOrders([]).build(),
  //     ]

  //     jest.spyOn(dealRepository, 'findAll').mockResolvedValue(mockDeals)
  //     jest.spyOn(productsFacade, 'findAll').mockResolvedValue(mockProducts)
  //     jest.spyOn(companyFacade, 'findAll').mockResolvedValue(mockCompanies)
  //     jest.spyOn(customerFacade, 'findAllAndOrders').mockResolvedValue(mockCustomers)

  //     await useCase.execute()

  //     const [dealsLeadRetrieval] = updateBatchDealsLeadRetrievalUseCase.execute.mock.calls[0]

  //     expect(updateBatchDealsLeadRetrievalUseCase.execute).toHaveBeenCalled()
  //     expect(dealsLeadRetrieval.length).toBe(0)
  //     expect(dealsLeadRetrieval).toEqual([])
  //   })
  // })
})
