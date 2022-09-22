import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { nationalIdentity, password } = request.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );
      const userAuthenticated = await authenticateUserUseCase.execute({
        nationalIdentity,
        password,
      });

      return response.status(200).json({
        userAuthenticated,
      });
    } catch (error) {
      const appError: AppError = error;
      console.log(appError);
      throw appError;
    }
  }
}

export { AuthenticateUserController };
