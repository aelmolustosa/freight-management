import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { isValidCPF } from "@shared/utils";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    nationalIdentity,
    password,
    fullName,
    profile,
    companyId,
  }: ICreateUserDTO): Promise<User> {
    let userProfile = profile;
    if (!userProfile) {
      userProfile = "driver";
    }

    if (!fullName) {
      throw new AppError("Full Name is required");
    }

    if (!password) {
      throw new AppError("Password is required");
    }

    if (!companyId) {
      throw new AppError("Company is required");
    }

    if (!nationalIdentity) {
      throw new AppError("National Identity is required");
    }

    const validatedNationalIdentity = isValidCPF(nationalIdentity);
    if (!validatedNationalIdentity) {
      throw new AppError("National Identity is not valid");
    }

    const userAlreadyExists = await this.usersRepository.findByNationalIdentity(
      nationalIdentity
    );
    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHashed = await hash(
      password,
      Number(process.env.PASSWORD_SALT)
    );

    const user = await this.usersRepository.create({
      nationalIdentity,
      password: passwordHashed,
      fullName,
      profile: userProfile,
      companyId,
    });

    return user;
  }
}

export { CreateUserUseCase };
