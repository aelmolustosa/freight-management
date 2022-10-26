import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { nationalIdentity } = request.body;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const profile = await profileUserUseCase.execute(user_id, nationalIdentity);

    return response.status(200).json({ profile });
  }
}

export { ProfileUserController };
