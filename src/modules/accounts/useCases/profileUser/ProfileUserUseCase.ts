import { IProfileUserDTO } from "@modules/accounts/dtos/IProfileUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<IProfileUserDTO> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const { id, nationalIdentity, fullName, profile, companyId } = user;

    const profileUser: IProfileUserDTO = {
      id,
      nationalIdentity,
      fullName,
      profile,
      companyId,
    };

    return profileUser;
  }
}

export { ProfileUserUseCase };
