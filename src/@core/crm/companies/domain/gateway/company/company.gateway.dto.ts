import { AssociationCrmObjectWithFromDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { CrmFilterInput } from '@/@core/crm/@shared/application/filter/filter-input'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'

export type CompanyGatewayCreateBatchInput = CompanyEntity[]
export type CompanyGatewayCreateBatchOutput = CompanyEntity[]

export type CompanyGatewayFindAllInput = {
  filters: CrmFilterInput
}
export type CompanyGatewayFindAllOutput = CompanyEntity[]

export type CompanyGatewayUpdateBatchInput = CompanyEntity[]
export type CompanyGatewayUpdateBatchOutput = void

export type CompanyGatewayAssociateInput = AssociationCrmObjectWithFromDto[]
export type CompanyGatewayAssociateOutput = void
