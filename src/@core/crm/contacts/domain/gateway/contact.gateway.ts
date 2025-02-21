import { Either } from '@/@core/@shared/domain/errors/either'
import {
  CreateCrmObjectDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { AssociateContactsWithContactsBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contact-with-contact-batch/associate-contact-with-contact-batch.dto'
import { AssociateContactsWithCompaniesBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.dto'

export interface ContactGateway {
  findAll(): Promise<ContactEntity[]>
  createBatch(
    contacts: CreateCrmObjectDto<ContactEntity>[],
  ): Promise<Either<Error, ContactEntity[]>>
  updateBatch(contacts: UpdateCrmObjectDto<ContactEntity>[]): Promise<Either<Error, void>>
  associateBatch(
    associations: AssociateContactsWithContactsBatchInputDto[],
  ): Promise<Either<Error, void>>
  associateWithCompaniesBatch(
    associations: AssociateContactsWithCompaniesBatchInputDto[],
  ): Promise<Either<Error, void>>
}
