import { IProfileUserDTO } from "@modules/accounts/dtos/IProfileUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<IProfileUserDTO> {
    const { id, nationalIdentity, fullName, profile, companyId } =
      await this.usersRepository.findById(user_id);

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
