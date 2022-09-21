import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { nationalIdentity, password, fullName, profile, companyId } =
      request.body;

    await createUserUseCase.execute({
      nationalIdentity,
      password,
      fullName,
      profile,
      companyId,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
