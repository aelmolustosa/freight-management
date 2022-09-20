import { ICreateUserDTO } from "modules/accounts/dtos/ICreateUserDTO";

import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    nationalIdentity,
    password,
    fullName,
    profile,
    companyId,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      nationalIdentity,
      password,
      fullName,
      profile,
      companyId,
    });

    this.users.push(user);

    return user;
  }

  async findByNationalIdentity(nationalIdentity: string): Promise<User> {
    const user = this.users.find(
      (user) => user.nationalIdentity === nationalIdentity
    );
    return user;
  }

  async findById(user_id: string): Promise<User> {
    const user = this.users.find((user) => user.id === user_id);
    return user;
  }
}

export { UsersRepositoryInMemory };
