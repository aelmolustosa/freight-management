import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe("Create Car", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
      fullName: "Alguém com Sobrenome da Silva",
      profile: "admin",
      companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with blank password", async () => {
    await expect(
      createUserUseCase.execute({
        nationalIdentity: "73290726134",
        password: "",
        fullName: "Alguém com Sobrenome da Silva",
        profile: "admin",
        companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with no nationalIdentity", async () => {
    await expect(
      createUserUseCase.execute({
        nationalIdentity: "",
        password: "y3*072PU",
        fullName: "Alguém com Sobrenome da Silva",
        profile: "admin",
        companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with no Full Name", async () => {
    await expect(
      createUserUseCase.execute({
        nationalIdentity: "73290726134",
        password: "y3*072PU",
        fullName: "",
        profile: "admin",
        companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with no Company", async () => {
    await expect(
      createUserUseCase.execute({
        nationalIdentity: "73290726134",
        password: "y3*072PU",
        fullName: "Alguém com Sobrenome da Silva",
        profile: "admin",
        companyId: "",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new user with no Profile", async () => {
    await expect(
      createUserUseCase.execute({
        nationalIdentity: "73290726134",
        password: "y3*072PU",
        fullName: "Alguém com Sobrenome da Silva",
        profile: "",
        companyId: "8152afe2-a4f5-47f4-83a5-b707674631f6",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
