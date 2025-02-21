import {
  FindAllDeliveryDetailInput,
  FindAllDeliveryDetailOutput,
} from '@/@core/fusion/application/usecases/find-all-delivery-detail/find-all-delivery-detail.dto'
import { FusionAPIGateway } from '@/@core/fusion/domain/gateways/fusion-api.gateway'
import { FusionClient } from '@/@core/fusion/infra/fusion.client'
// import { DelivevryDetailInfraMapper } from '@/@core/fusion/infra/mappers/delivery-detail-infra.mapper'

export class FusionAPIRepository implements FusionAPIGateway {
  constructor(private readonly fusionClient: FusionClient) {}

  getDeliveryDetail = async ({
    ordersId,
  }: FindAllDeliveryDetailInput): Promise<FindAllDeliveryDetailOutput> => {
    console.log(ordersId)
    // const args = {
    //   login: this.fusionClient.login,
    //   senha: this.fusionClient.password,
    //   pedido_erp: orderId,
    // }

    // try {
    //   const [result] = await this.fusionClient.client.detalheEntregaAsync(args)
    //   const value: string = result['resParam']['$value']

    //   if (value.includes('id')) {
    //     const resultJson = JSON.parse(value)
    //     return typeof resultJson === 'object'
    //       ? DelivevryDetailInfraMapper.toDomain(resultJson)
    //       : null
    //   }

    return null
    // } catch (error) {
    //   console.error('Error in deliveryDetail:', error)
    // }
  }
}
