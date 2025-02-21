import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { SimplePublicObject } from '@hubspot/api-client/lib/codegen/crm/companies'

export type CompanyToDomainMapperInput = SimplePublicObject

export type CompanyToDomainMapperOutput = CompanyEntity
