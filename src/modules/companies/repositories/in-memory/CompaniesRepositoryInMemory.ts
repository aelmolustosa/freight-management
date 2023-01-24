import { ICreateCompany } from "@modules/companies/dtos/ICreateCompany";
import { Company } from "@modules/companies/infra/typeorm/entities/Company";

import { ICompaniesRepository } from "../ICompaniesRepository";

class CompaniesRepositoryInMemory implements ICompaniesRepository {
  companies: Company[] = [];

  async create(data: ICreateCompany): Promise<Company> {
    const { name, nationalIdentity, email, country } = data;

    const company = new Company();
    Object.assign(company, { name, nationalIdentity, email, country });
    this.companies.push(company);

    return company;
  }

  async findById(company_id: string): Promise<Company> {
    const company = this.companies.find((company) => company.id === company_id);
    return company;
  }

  async findByNationalIdentity(nationalIdentity: string): Promise<Company> {
    const company = this.companies.find(
      (company) => company.nationalIdentity === nationalIdentity
    );
    return company;
  }
}

export { CompaniesRepositoryInMemory };
