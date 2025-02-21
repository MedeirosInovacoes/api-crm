import { Either, left, right } from '@/@core/@shared/domain/errors/either'
import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { CrmMapper } from '@/@core/crm/@shared/application/mappers/crm.mapper'
import {
  CreateCrmObjectDto,
  UpdateCrmObjectDto,
} from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'
import { ContactEntity } from '@/@core/crm/contacts/domain/entities/contact'
import { ContactGateway } from '@/@core/crm/contacts/domain/gateway/contact.gateway'
import { AssociateContactsWithContactsBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contact-with-contact-batch/associate-contact-with-contact-batch.dto'
import { AssociateContactsWithCompaniesBatchInputDto } from '@/@core/crm/contacts/application/usecases/associate-contacts-with-companies-batch/associate-contacts-with-companies-batch.dto'
import { InternalServerErrorException } from '@nestjs/common'
import { env } from '@/@core/@shared/infra/env'

export class ContactRepository implements ContactGateway {
  constructor(private readonly crmRepository: CrmGatewayInterface) {}

  async associateBatch(
    associations: AssociateContactsWithContactsBatchInputDto[],
  ): Promise<Either<Error, void>> {
    try {
      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository
        .getConnection()
        .crm.associations.v4.batchApi.create('contacts', 'contacts', {
          inputs: associations.map((association) =>
            CrmMapper.toAssociationWithFrom({
              types: [
                {
                  category: AssociationTypeEnum.USER_DEFINED,
                  typeId: env.NODE_ENV === 'production' ? 1 : 74,
                },
              ],
              to: {
                id: association.contactPrimaryId,
              },
              from: {
                id: association.contactSecondaryId,
              },
            }),
          ),
        })
    } catch (error) {
      console.log(error)

      return left(new InternalServerErrorException(error.message))
    }
  }

  async associateWithCompaniesBatch(
    associations: AssociateContactsWithCompaniesBatchInputDto[],
  ): Promise<Either<Error, void>> {
    try {
      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository
        .getConnection()
        .crm.associations.v4.batchApi.create('companies', 'contacts', {
          inputs: associations.map((association) =>
            CrmMapper.toAssociationWithFrom({
              from: { id: association.companyId },
              to: { id: association.contactId },
              types: [{ category: AssociationTypeEnum.CRM_DEFINED, typeId: 280 }],
            }),
          ),
        })
    } catch (error) {
      console.log(error)

      return left(new InternalServerErrorException(error.message))
    }
  }

  async findAll(): Promise<ContactEntity[]> {
    await this.crmRepository.enforceRequestLimit()
    const response = await this.crmRepository
      .getConnection()
      .crm.contacts.getAll(100, undefined, [
        'firstname',
        'email',
        'associated_email',
        'customer_code',
        'customer_primary_code',
        'invalid_email',
      ])

    return response.map(
      (contact) =>
        new ContactEntity(
          {
            name: contact.properties.firstname,
            customerCode: +contact.properties.customer_code,
            customerPrimaryCode: +contact.properties.customer_primary_code,
            email: contact.properties.email,
            associatedEmail: contact.properties.associated_email,
            invalidEmail: contact.properties.invalid_email,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
          },
          contact.id,
        ),
    )
  }

  async createBatch(
    contacts: CreateCrmObjectDto<ContactEntity>[],
  ): Promise<Either<Error, ContactEntity[]>> {
    try {
      await this.crmRepository.enforceRequestLimit()
      const response = await this.crmRepository.getConnection().crm.contacts.batchApi.create({
        inputs: contacts.map((contact) =>
          CrmMapper.toCreate({
            data: contact.data.toCrm(),
            associations: contact.associations,
          }),
        ),
      })

      return right(
        response.results.map(
          (contact) =>
            new ContactEntity(
              {
                name: contact.properties.firstname,
                customerCode: +contact.properties.customer_code,
                customerPrimaryCode: +contact.properties.customer_primary_code,
                email: contact.properties.email,
                associatedEmail: contact.properties.associated_email,
                invalidEmail: contact.properties.invalid_email,
                createdAt: contact.createdAt,
                updatedAt: contact.updatedAt,
              },
              contact.id,
            ),
        ),
      )
    } catch (error) {
      console.log(error)
      return left(new InternalServerErrorException(error.message))
    }
  }

  async updateBatch(contacts: UpdateCrmObjectDto<ContactEntity>[]): Promise<Either<Error, void>> {
    try {
      await this.crmRepository.enforceRequestLimit()
      await this.crmRepository.getConnection().crm.contacts.batchApi.update({
        inputs: contacts.map((contact) =>
          CrmMapper.toUpdate({
            id: contact.id,
            data: contact.data.toCrm(),
          }),
        ),
      })
    } catch (error) {
      console.log(error)
      return left(new InternalServerErrorException(error.message))
    }
  }
}

// try {
//   await this.crmRepository.enforceRequestLimit()
//   await this.crmRepository
//     .getConnection()
//     .crm.associations.v4.batchApi.create('companies', 'contacts', {
//       inputs: associations.map((association) => CrmMapper.toAssociationWithFrom(association)),
//     })
// } catch (error) {
//   return left(new InternalServerErrorException(error.message))
// }
