import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { CompaniesRepositoryInMemory } from "@modules/companies/repositories/in-memory/CompaniesRepositoryInMemory";

import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

let companiesRepository: ICompaniesRepository;
let createCompanyUseCase: CreateCompanyUseCase;

describe("Create Company", () => {
  beforeEach(() => {
    companiesRepository = new CompaniesRepositoryInMemory();
    createCompanyUseCase = new CreateCompanyUseCase(companiesRepository);
  });

  it("Should be able to create a new company", async () => {
    const company = await createCompanyUseCase.execute({
      name: "Nome Qualquer",
      nationalIdentity: "81497581000110",
      email: "nomequalquer@gmail.com",
      country: "BR",
    });

    console.log("company", company);

    expect(company).toHaveProperty("id");
  });
});
