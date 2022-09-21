import { IUsersRepository } from "modules/accounts/repositories/IUsersRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    await createUserUseCase.execute({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
      fullName: "Alguém com Sobrenome da Silva",
      profile: "admin",
      companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
    });
  });

  it("Should be able to login", async () => {
    const user = await authenticateUserUseCase.execute(
      "73290726134",
      "y3*072PU"
    );

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to login with wrong password", async () => {
    await expect(
      authenticateUserUseCase.execute("73290726134", "y3*072P1")
    ).rejects.toEqual(new AppError("User and password does not match"));
  });

  it("Should not be able to login with nationalIdentity no existent", async () => {
    await expect(
      authenticateUserUseCase.execute("73290726134", "y3*072P1")
    ).rejects.toEqual(new AppError("User and password does not match"));
  });

  it("Should not be able to login with no password", async () => {
    await expect(
      authenticateUserUseCase.execute("73290726134", "")
    ).rejects.toEqual(new AppError("Password is required"));
  });

  it("Should not be able to login with no nationalIdentity", async () => {
    await expect(authenticateUserUseCase.execute("", "123456")).rejects.toEqual(
      new AppError("National Identity is required")
    );
  });
});
