import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let profileUserUseCase: ProfileUserUseCase;
let user: User;

describe("Profile User UseCase", () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    user = await usersRepositoryInMemory.create({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
      fullName: "Alguém com Sobrenome da Silva",
      profile: "admin",
      companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
    });

    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to get profile from the logged user", async () => {
    const profileUser = await profileUserUseCase.execute(
      user.id,
      "73290726134"
    );

    expect(profileUser).toHaveProperty("nationalIdentity", "73290726134");
    expect(profileUser).toHaveProperty(
      "fullName",
      "Alguém com Sobrenome da Silva"
    );
  });
});
