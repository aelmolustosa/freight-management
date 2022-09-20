import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByNationalIdentity(nationalIdentity: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}

export { IUsersRepository };
