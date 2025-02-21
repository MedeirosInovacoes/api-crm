import {
  CompanyGatewayCreateBatchInput,
  CompanyGatewayCreateBatchOutput,
  CompanyGatewayUpdateBatchInput,
  CompanyGatewayUpdateBatchOutput,
  CompanyGatewayFindAllInput,
  CompanyGatewayFindAllOutput,
  CompanyGatewayAssociateInput,
  CompanyGatewayAssociateOutput,
} from '@/@core/crm/companies/domain/gateway/company/company.gateway.dto'

export interface CompanyGateway {
  createBatch(input: CompanyGatewayCreateBatchInput): Promise<CompanyGatewayCreateBatchOutput>
  updateBatch(input: CompanyGatewayUpdateBatchInput): Promise<CompanyGatewayUpdateBatchOutput>
  findAll(input?: CompanyGatewayFindAllInput): Promise<CompanyGatewayFindAllOutput>
  associateBatch(input: CompanyGatewayAssociateInput): Promise<CompanyGatewayAssociateOutput>
}
