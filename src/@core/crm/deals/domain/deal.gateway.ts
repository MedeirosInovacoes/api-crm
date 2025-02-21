import { Either } from '@/@core/@shared/domain/errors/either'
import {
  CreateCrmObjectDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { CrmFilterInput } from '@/@core/crm/@shared/application/filter/filter-input'
import { DealCrmBuilderOutputDto } from '@/@core/crm/deals/domain/entities/deal-crm.build'
import { DealEntity } from '@/@core/crm/deals/domain/entities/deal.entity'

export type DealGateway = {
  findAll(input?: TFindAllDealRepositoryInput): Promise<DealEntity[]>
  createBatch(contacts: CreateCrmObjectDto<DealCrmBuilderOutputDto>[]): Promise<Either<Error, void>>
  updateBatch<T = DealCrmBuilderOutputDto>(
    contacts: UpdateCrmObjectDto<T>[],
  ): Promise<Either<Error, void>>
  findOwnerById(id: TFindOwnerByIdRepositoryInput): Promise<TFindOwnerByIdRepositoryOutPut>
}

export type TFindOwnerByIdRepositoryInput = {
  id: string
}

export type TFindOwnerByIdRepositoryOutPut = {
  name: string
}

export type TFindAllDealRepositoryInput = {
  filter?: CrmFilterInput
  properties?: string[]
}
