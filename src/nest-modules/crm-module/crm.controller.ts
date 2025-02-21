import { ProcessCompaniesAndContactsByEcommerceUseCase } from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts-by-ecommerce/process-companies-and-contacts-by-ecommerce.usecase'
import { ProcessCompaniesAndContactsUseCase } from '@/@core/crm/@shared/application/usecases/process-companies-and-contacts/process-companies-and-contacts.usecase'
import { CheckLastOrderReleasedUseCase } from '@/@core/crm/deals/application/usecases/check-last-order-released/check-last-order-released.usecase'
import { CheckBatchDealsLeadRetrievalCompanyReactivationUseCase } from '@/@core/crm/deals/application/usecases/pipelines/lead-retrieval/check-company-reactivation/check-company-reactivation.usecase'
import { ProcessDealsUseCase } from '@/@core/crm/deals/application/usecases/process-deals/process-deals.usecase'
import { UpdateAllDeliveryDatesUseCase } from '@/@core/crm/deals/application/usecases/update-all-delivery-dates/update-all-delivery-dates.usecase'
import { ProcessProductsUseCase } from '@/@core/crm/products/application/usecases/process-products/process-products.usecase'
import { Controller, Get, Query } from '@nestjs/common'
import { Cron, Interval } from '@nestjs/schedule'
import { FindAllDealsPipelinesPresenter } from './providers/requests/infra/presenters/preventive-maintenance-checklist/preventive-maintece-checklist.presenter'
import { FindAllOriginCustomersCompaniesUseCase } from '@/@core/crm/companies/application/usecase/find-all-origin-customers-companies/find-all-origin-customers-companies.usecase'
import { FindAllOriginCustomersCompaniesPresenter } from '@/nest-modules/crm-module/providers/requests/infra/presenters/find-all-origin-customers-companies/find-all-origin-customers-companies.presenter'
import { FindAllDealsPipelinesUseCase } from '@/@core/crm/deals/application/usecases/find-all-deals-pipelines/find-all-deals-pipelines.usecase'
import { env } from '@/@core/@shared/infra/env'

@Controller('api/v1/crm')
export class CrmController {
  constructor(
    private readonly processCompaniesAndContactsUseCase: ProcessCompaniesAndContactsUseCase,
    private readonly processProductsUseCase: ProcessProductsUseCase,
    private readonly processDealsUseCase: ProcessDealsUseCase,
    private readonly checkBatchDealsLeadRetrievalCompanyReactivationUseCase: CheckBatchDealsLeadRetrievalCompanyReactivationUseCase,
    private readonly checkLastOrderReleasedUseCase: CheckLastOrderReleasedUseCase,
    private readonly updateAllDeliveryDatesUseCase: UpdateAllDeliveryDatesUseCase,
    private readonly processCompaniesAndContactsByEcommerceUseCase: ProcessCompaniesAndContactsByEcommerceUseCase,
    private readonly findAllDealsPipelinesUseCase: FindAllDealsPipelinesUseCase,
    private readonly findAllOriginCustomersCompaniesUseCase: FindAllOriginCustomersCompaniesUseCase,
  ) {}

  private isProduction() {
    return env.NODE_ENV === 'production'
  }

  @Cron('45 0 * * *', { timeZone: 'America/Sao_Paulo' })
  async processTheCompaniesBase() {
    if (this.isProduction()) {
      console.log('Chamando processCompaniesAndContactsUseCase')
      await this.processCompaniesAndContactsUseCase.execute()
      console.log('Fim do processCompaniesAndContactsUseCase')
    }
  }

  @Cron('10 0 * * *', { timeZone: 'America/Sao_Paulo' })
  async processProducts() {
    if (this.isProduction()) {
      console.log('Chamando processProductsUseCase')
      await this.processProductsUseCase.execute()
      console.log('Fim do processProductsUseCase')
    }
  }

  @Interval(300000)
  async updateCompaniesAndContactsByEcommerce() {
    if (this.isProduction()) {
      console.log('Chamando processCompaniesAndContactsByEcommerceUseCase')
      await this.processCompaniesAndContactsByEcommerceUseCase.execute()
      console.log('Fim do processCompaniesAndContactsByEcommerceUseCase')
    }
  }

  @Interval(600000)
  async updateBase() {
    if (this.isProduction()) {
      console.log('Chamando checkLastOrderReleasedUseCase')
      await this.checkLastOrderReleasedUseCase.execute()
      console.log('Fim do checkLastOrderReleasedUseCase')

      console.log('Chamando checkBatchCompanyReactivationUseCase')
      await this.checkBatchDealsLeadRetrievalCompanyReactivationUseCase.execute()
      console.log('Fim do checkBatchCompanyReactivationUseCase')

      console.log('Chamando processDealsUseCase')
      await this.processDealsUseCase.execute()
      console.log('Fim do processDealsUseCase')

      console.log('Chamando updateAllDeliveryDatesUseCase')
      await this.updateAllDeliveryDatesUseCase.execute()
      console.log('Fim do updateAllDeliveryDatesUseCase')
    }
  }

  @Get('deals/pipelines')
  async findAllDealsPipelines() {
    const output = await this.findAllDealsPipelinesUseCase.execute()

    const json = output.map(FindAllDealsPipelinesPresenter.toJson)

    return json.map(FindAllDealsPipelinesPresenter.translateToPortuguese)
  }

  @Get('companies')
  async findAll(@Query('fields') fields: string) {
    const output = await this.findAllOriginCustomersCompaniesUseCase.execute({
      fields: fields?.split(','),
    })

    return output.map(FindAllOriginCustomersCompaniesPresenter.translateToPortuguese)
  }
}
