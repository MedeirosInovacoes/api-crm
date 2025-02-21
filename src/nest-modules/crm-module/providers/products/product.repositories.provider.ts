import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { ProductAPIRepository } from '@/@core/crm/products/infra/hubspot/repository/product-api.repository'
import { ProductModel } from '@/@core/crm/products/infra/winthor/typeorm/models/product.model'
import { ProductWinthorRepository } from '@/@core/crm/products/infra/winthor/typeorm/repository/product.repository'
import { CRM_REPOSITORY_PROVIDERS } from '@/nest-modules/crm-module/providers/crm.repositories.provider'
import { Provider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

const productAPIRepository: Provider = {
  provide: 'ProductAPIGateway',
  useExisting: ProductAPIRepository,
}

const productAPIRepositoryProvider: Provider = {
  provide: ProductAPIRepository,
  useFactory: (crmRepository: CrmGatewayInterface) =>
    new ProductAPIRepository({
      crmRepository,
    }),
  inject: [CRM_REPOSITORY_PROVIDERS.CRM_REPOSITORY.provide],
}

const productWinthorGatewayProvider: Provider = {
  provide: 'ProductDBGateway',
  useExisting: ProductWinthorRepository,
}

const productWinthorRepositoryProvider: Provider = {
  provide: ProductWinthorRepository,
  useFactory: (productWinthorRepository: Repository<ProductModel>) =>
    new ProductWinthorRepository({
      productWinthorRepository,
    }),
  inject: [getRepositoryToken(ProductModel)],
}

export const PRODUCTS_REPOSITORIES_PROVIDERS = {
  PRODUCT_API_GATEWAY: productAPIRepository,
  PRODUCT_API_REPOSITORY: productAPIRepositoryProvider,
  PRODUCT_WINTHOR_GATEWAY: productWinthorGatewayProvider,
  PRODUCT_WINTHOR_REPOSITORY: productWinthorRepositoryProvider,
}
