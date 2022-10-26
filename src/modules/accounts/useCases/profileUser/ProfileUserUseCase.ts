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

  async execute(
    logged_user_id: string,
    nationalIdentity: string
  ): Promise<IProfileUserDTO> {
    const logged_user = await this.usersRepository.findById(logged_user_id);

    if (logged_user.profile !== "Admin") {
      if (logged_user.nationalIdentity !== nationalIdentity) {
        throw new AppError("Not allowed");
      }
    }

    if (!nationalIdentity) {
      throw new AppError("User does not specified");
    }

    const user = await this.usersRepository.findByNationalIdentity(
      nationalIdentity
    );
    if (!user) {
      throw new AppError("User does not exists");
    }

    const { id, fullName, profile, companyId } = user;

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
