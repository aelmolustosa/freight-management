import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm/DataSource";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { nationalIdentity, password, fullName, profile, companyId } = data;

    const userCreated = this.repository.create({
      nationalIdentity,
      password,
      fullName,
      profile,
      companyId,
    });

    await this.repository.save(userCreated);
  }
  async findByNationalIdentity(nationalIdentity: string): Promise<User> {
    const user = await this.repository.findOne({ where: { nationalIdentity } });
    return user;
  }
  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id: user_id } });
    return user;
  }
}

export { UsersRepository };
