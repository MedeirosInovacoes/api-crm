import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { ProductFacade } from '@/@core/crm/products/application/facade/product/product.facade'

export type TProductFacadeFactoryCreateInput = {
  crmRepository: CrmGatewayInterface
}

export type TProductFacadeFactoryCreateOutput = ProductFacade
