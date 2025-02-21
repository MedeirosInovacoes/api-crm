import { AssociationTypeEnum } from '@/@core/crm/@shared/application/enum/association-type.enum'
import {
  AssociateChildCompaniesWithParentDependecies,
  AssociateChildCompaniesWithParentOutput,
} from '@/@core/crm/companies/application/usecase/associate-child-companies-with-parent/associate-child-companies-with-parent.dto'
import { CompanyEntity } from '@/@core/crm/companies/domain/entities/company/company.entity'
import { env } from '@/@core/@shared/infra/env'
import { SplitArrayIntoChunksUtil } from '@/@core/crm/@shared/application/utils/split-array-into-chunks.util'
import { AssociationCrmObjectWithFromDto } from '@/@core/crm/@shared/application/dto/crm-object.dto'
import { CrmFilterInputOperatorEnum } from '@/@core/crm/@shared/application/enum/filter-input.enum'

export class AssociateChildCompaniesWithParentUseCase {
  constructor(private dependecies: AssociateChildCompaniesWithParentDependecies) {}

  execute = async (): Promise<AssociateChildCompaniesWithParentOutput> => {
    const items: AssociationCrmObjectWithFromDto[] = []

    const companies = await this.dependecies.companyRepository.findAll({
      filters: {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'customer_code',
                operator: CrmFilterInputOperatorEnum.HasProperty,
              },
              {
                propertyName: 'customer_primary_code',
                operator: CrmFilterInputOperatorEnum.HasProperty,
              },
            ],
          },
        ],
      },
    })

    const parentCompanies = companies.filter(
      (company) => company.customerCode === company.customerPrimaryCode,
    )

    const companiesResult = this.filterCompanies({ companies: companies, parentCompanies })

    for (const company of companiesResult) {
      items.push({
        from: company.secondary,
        to: company.primary,
        types: [
          {
            category: AssociationTypeEnum.USER_DEFINED,
            typeId: env.NODE_ENV === 'production' ? 2 : 73,
          },
        ],
      })
    }

    await this.persistChunks({ items })
  }

  private filterCompanies({
    companies,
    parentCompanies,
  }: {
    companies: CompanyEntity[]
    parentCompanies: CompanyEntity[]
  }): { primary: CompanyEntity; secondary: CompanyEntity }[] {
    return companies
      .map((company) => {
        const match = parentCompanies.find(
          (value) =>
            company.customerPrimaryCode === value.customerCode &&
            company.customerPrimaryCode !== company.customerCode,
        )

        if (match) {
          return { primary: company, secondary: match }
        }

        return null
      })
      .filter((value) => value !== null)
  }

  private persistChunks = async ({ items }: PersistChuncksInput) => {
    const chunksData = SplitArrayIntoChunksUtil.splitArrayIntoChunks(items, 100)

    for (const chunk of chunksData) {
      await this.dependecies.companyRepository.associateBatch(chunk)
    }
  }
}

type PersistChuncksInput = {
  items: AssociationCrmObjectWithFromDto[]
}
