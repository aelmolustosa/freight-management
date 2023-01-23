import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, nationalIdentity, email } = request.body;

    let { country } = request.body;
    if (!country) country = "BR";

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    await createCompanyUseCase.execute({
      name,
      nationalIdentity,
      email,
      country,
    });

    return response.status(201).send();
  }
}

export { CreateCompanyController };
