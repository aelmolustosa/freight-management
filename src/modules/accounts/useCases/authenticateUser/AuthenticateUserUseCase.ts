import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(nationalIdentity, password): Promise<User> {
    if (!nationalIdentity) {
      throw new AppError("National Identity is required");
    }

    if (!password) {
      throw new AppError("Password is required");
    }

    const user = await this.usersRepository.findByNationalIdentity(
      nationalIdentity
    );
    if (!user) {
      throw new AppError("User and password does not match");
    }

    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      throw new AppError("User and password does not match");
    }

    return user;
  }
}

export { AuthenticateUserUseCase };
