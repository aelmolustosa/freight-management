import { CreateCompanyController } from "@modules/companies/useCases/createCompany/CreateCompanyController";
import { Router } from "express";

import { ensureAuthentcated } from "../middlewares/ensureAuthenticated";

const companiesRoutes = Router();

const createCompanyController = new CreateCompanyController();

companiesRoutes.post("/", ensureAuthentcated, createCompanyController.handle);

export { companiesRoutes };
