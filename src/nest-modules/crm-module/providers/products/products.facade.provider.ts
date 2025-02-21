import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'
import { ProductFacadeFactory } from '@/@core/crm/products/application/factories/facade/facade.factory'
import { CRM_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/crm.repositories.provider'
import { Provider } from '@nestjs/common'

const productFacadeProvider: Provider = {
  provide: ProductFacade,
  useFactory: (crmRepository: CrmGatewayInterface) =>
    ProductFacadeFactory.create({
      crmRepository,
    }),
  inject: [CRM_REPOSITORY_PROVIDERS.CRM_REPOSITORY.provide],
}

export const PRODUCTS_FACADE_PROVIDERS = {
  PRODUCT_FACADE: productFacadeProvider,
}
