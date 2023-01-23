import { CreateCompanyController } from "@modules/companies/useCases/createCompany/CreateCompanyController";
import { Router } from "express";

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();

companiesRoutes.post("/", createCompanyController.handle);

export { companiesRoutes };
