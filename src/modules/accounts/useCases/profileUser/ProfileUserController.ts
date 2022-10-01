import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = "8e39e12d-47bc-4573-9cec-c88afd33b790";

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const profile = await profileUserUseCase.execute(user_id);

    return response.status(200).json({ profile });
  }
}

export { ProfileUserController };
