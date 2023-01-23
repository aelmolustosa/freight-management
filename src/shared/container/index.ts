import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CompaniesRepository } from "@modules/companies/infra/typeorm/repositories/CompaniesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICompaniesRepository>(
  "CompaniesRepository",
  CompaniesRepository
);
