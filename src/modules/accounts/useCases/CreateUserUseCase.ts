import { hash } from "bcryptjs";
import { isValidCPF } from "shared/utils";

import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UsersRepository } from "../infra/typeorm/repositories/UserRepository";

class CreateUserUseCase {
  async execute({
    nationalIdentity,
    password,
    fullName,
    profile,
    companyId,
  }: ICreateUserDTO): Promise<void> {
    const usersRepository = new UsersRepository();

    if (!nationalIdentity) {
      throw new AppError("National Identity is required");
    }

    const validatedNationalIdentity = isValidCPF(nationalIdentity);
    if (!validatedNationalIdentity) {
      throw new AppError("National Identity is not valid");
    }

    const userAlreadyExists = await usersRepository.findByNationalIdentity(
      nationalIdentity
    );
    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHashed = await hash(
      password,
      Number(process.env.PASSWORD_SALT)
    );

    await usersRepository.create({
      nationalIdentity,
      password: passwordHashed,
      fullName,
      profile,
      companyId,
    });
  }
}

export { CreateUserUseCase };
