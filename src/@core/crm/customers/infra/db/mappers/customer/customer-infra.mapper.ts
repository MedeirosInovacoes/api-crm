import { PhoneValidator } from '@/@core/@shared/application/utils/formaters/phone.validator'
import { CustomerEntity } from '@/@core/crm/customers/domain/entities/customer/customer.entity'
import {
  CustomerInfraMapperInputDto,
  CustomerInfraMapperOutputDto,
} from '@/@core/crm/customers/infra/db/mappers/customer/customer-infra.mapper.dto'
import { OrderInfraMapper } from '@/@core/crm/customers/infra/db/mappers/customer/order-infra.mapper'
import { parse } from 'date-fns'

export class CustomerInfraMapper {
  static toDomain(input: CustomerInfraMapperInputDto): CustomerInfraMapperOutputDto {
    const channel = input.channels.find(
      (branch) => branch.activityCode == input.customer.activity?.CODATIV,
    )

    const limit = input.limits.find(
      (availabelLimit) => availabelLimit?.customerCode === input.customer.CODCLI,
    )

    const reactivationDate =
      input.customer.OBS2?.includes('REATIVADO') &&
      parse(input.customer.OBS2.split(' ')[1], 'dd/MM/yyyy', new Date())

    let phone = null

    if (input.customer.TELENT && PhoneValidator.validate(input.customer.TELENT)) {
      phone = input.customer.TELENT
    } else if (input.customer.TELCELENT && PhoneValidator.validate(input.customer.TELCELENT)) {
      phone = input.customer.TELCELENT
    }

    return new CustomerEntity({
      customerCode: input.customer.CODCLI,
      customerPrimaryCode: input.customer.CODCLIPRINC,
      name: input.customer.FANTASIA,
      cpfCnpj: input.customer.CGCENT,
      client: input.customer.CLIENTE,
      kindPerson: input.customer.TIPOFJ,
      classification: input.customer.VIP,
      dateLastPurchase: input.customer.DTULTCOMP,
      observation: input.customer.OBS,
      billingCode: input.customer.CODCOB,
      registrationDate: input.customer.DTCADASTRO,
      stateRegistration: input.customer.IEENT,
      emailNfe: input.customer.EMAILNFE,
      limit: +limit?.limit?.toFixed(2) || 0,
      availableLimit: +limit?.availableLimit?.toFixed(2) || 0,
      email: input.customer.EMAIL,
      blocked: input.customer.BLOQUEIO,
      website: input.customer.SITE,
      address: input.customer.ENDERENT,
      district: input.customer.BAIRROENT,
      city: input.customer.MUNICENT,
      phone,
      complement: input.customer.COMPLEMENTOENT,
      salesCode: input.customer.CODUSUR1,
      state: input.customer.ESTENT,
      zipCode: input.customer.CEPENT,
      billingBranchCode: input.customer.billingBranch?.CODIGO,
      billingBranchDescription: input.customer.billingBranch?.CIDADE,
      networkCode: input.customer.network?.CODREDE,
      networkDescription: input.customer.network?.DESCRICAO,
      activityCode: input.customer.activity?.CODATIV,
      activityDescription: input.customer.activity?.RAMO,
      channelDescription: channel?.channelName ?? null,
      squareCode: input.customer.square?.CODPRACA,
      squareDescription: input.customer.square?.PRACA,
      reactivationDate: reactivationDate ?? null,
      orders: input.customer.orders?.map(OrderInfraMapper.toDomain),
    })
  }
}
