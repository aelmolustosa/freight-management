import { ICreateCompany } from "@modules/companies/dtos/ICreateCompany";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/DataSource";

import { Company } from "../entities/Company";

class CompaniesRepository implements ICompaniesRepository {
  private repository: Repository<Company>;

  constructor() {
    this.repository = AppDataSource.getRepository(Company);
  }

  async create(data: ICreateCompany): Promise<Company> {
    const { name, nationalIdentity, email, country } = data;

    const companyCreated = this.repository.create({
      name,
      nationalIdentity,
      email,
      country,
    });

    await this.repository.save(companyCreated);

    return companyCreated;
  }

  async findById(company_id: string): Promise<Company> {
    const company = await this.repository.findOne({
      where: { id: company_id },
    });
    return company;
  }

  async findByNationalIdentity(nationalIdentity: string): Promise<Company> {
    const company = await this.repository.findOne({
      where: { nationalIdentity },
    });
    return company;
  }
}

export { CompaniesRepository };
