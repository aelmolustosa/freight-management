import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { CompaniesRepositoryInMemory } from "@modules/companies/repositories/in-memory/CompaniesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

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
      name: "Any Name",
      nationalIdentity: "81497581000110",
      email: "nomequalquer@gmail.com",
      country: "BR",
    });

    expect(company).toHaveProperty("id");
  });

  it("Should not be able to create a new company without name", async () => {
    await expect(
      createCompanyUseCase.execute({
        name: "",
        nationalIdentity: "81497581000110",
        email: "nomequalquer@gmail.com",
        country: "BR",
      })
    ).rejects.toEqual(new AppError("Name is required"));
  });

  it("Should not be able to create a new company without National Identity", async () => {
    await expect(
      createCompanyUseCase.execute({
        name: "Any Name",
        nationalIdentity: "",
        email: "nomequalquer@gmail.com",
        country: "BR",
      })
    ).rejects.toEqual(new AppError("National Identity is required"));
  });

  it("Should not be able to 'create'/'set up' a new company without valid National Identity", async () => {
    await expect(
      createCompanyUseCase.execute({
        name: "Any Name",
        nationalIdentity: "81497581000111",
        email: "nomequalquer@gmail.com",
        country: "BR",
      })
    ).rejects.toEqual(new AppError("National Identity is not valid"));
  });
});
