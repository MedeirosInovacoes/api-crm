import {
  FindALlCompaniesDependecies,
  FindAllCompaniesInput,
  FindAllCompaniesOutput,
} from '@/@core/crm/companies/application/usecase/find-all-companies/find-all-companies.dto'

export class FindAllCompaniesUseCase {
  constructor(private dependecies: FindALlCompaniesDependecies) {}

  async execute(input?: FindAllCompaniesInput): Promise<FindAllCompaniesOutput> {
    const response = await this.dependecies.companyRepository.findAll(input)

    return response
  }
}
