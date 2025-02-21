import {
  CustomerLimitInfraMapperInputDto,
  CustomerLimitInfraMapperOutputDto,
} from '@/@core/crm/customers/infra/db/mappers/customer-limit/customer-limit.mapper.infra'

export class CustomerLimitInfraMapper {
  static toDomain(input: CustomerLimitInfraMapperInputDto): CustomerLimitInfraMapperOutputDto {
    return {
      limit: {
        availableLimit: input.limit.CREDITODISPONIVEL,
        billingBranchCode: input.limit.CODCOB,
        customerCode: input.limit.CODCLI,
        limit: input.limit.LIMITE,
      },
    }
  }
}
