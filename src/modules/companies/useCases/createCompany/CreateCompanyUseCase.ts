import { ICreateCompany } from "@modules/companies/dtos/ICreateCompany";
import { Company } from "@modules/companies/infra/typeorm/entities/Company";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { isValidCPFCNPJ, onlyNumbers } from "@shared/utils";

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({
    name,
    nationalIdentity,
    email,
    country,
  }: ICreateCompany): Promise<Company> {
    if (!name) {
      throw new AppError("Name is required");
    }

    if (!nationalIdentity) {
      throw new AppError("National Identity is required");
    }

    const nationalIdentityOnlyNumbers: string = onlyNumbers(nationalIdentity);

    const validatedNationalIdentity = isValidCPFCNPJ(
      nationalIdentityOnlyNumbers
    );
    if (!validatedNationalIdentity) {
      throw new AppError("National Identity is not valid");
    }

    const nationalIdentityAlreadyExists =
      await this.companiesRepository.findByNationalIdentity(
        nationalIdentityOnlyNumbers
      );

    if (nationalIdentityAlreadyExists) {
      throw new AppError("National Identity already exists");
    }

    if (!email) {
      throw new AppError("e-mail is required");
    }

    if (!country) {
      throw new AppError("Country is required");
    }

    const company = await this.companiesRepository.create({
      name,
      nationalIdentity: nationalIdentityOnlyNumbers,
      email,
      country,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
