import { IAuthenticatedUserDTO } from "@modules/accounts/dtos/IAuthenticateUserDTO";
import request from "supertest";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/DataSource";
import { delay } from "@shared/utils";

interface IBody {
  userAuthenticated: IAuthenticatedUserDTO;
}

jest.setTimeout(30000);

describe("Create Company Controller", () => {
  let token755: string;

  beforeAll(async () => {
    await AppDataSource.initialize();
    await delay(5000);
    await AppDataSource.runMigrations();
    await delay(5000);

    // Create user
    await request(app).post("/users").send({
      nationalIdentity: "75598745178",
      password: "y3*072PU",
      fullName: "Euclides Miguela",
      profile: "Admin",
      companyId: "00111222444455",
    });

    await delay(1000);

    // Authenticate
    const { body: body755 } = await request(app).post("/login").send({
      nationalIdentity: "75598745178",
      password: "y3*072PU",
    });

    await delay(1000);

    // Get Token
    ({ token: token755 } = (body755 as IBody).userAuthenticated);
  });

  it("Should be able to create a Company", async () => {
    const responseCreateCompany = await request(app)
      .post("/company")
      .send({
        name: "Company 001",
        nationalIdentity: "50.854.279/0001-49",
        email: "a001@company.com.br",
        country: "BR",
      })
      .set({
        Authorization: `Bearer ${token755}`,
      });
    delay(1000);

    expect(responseCreateCompany).toHaveProperty("statusCode", 201);
  });

  it("Should not be able to create a Company with no token", async () => {
    const responseCreateCompany = await request(app).post("/company").send({
      name: "Company 001",
      nationalIdentity: "50.854.279/0001-49",
      email: "a001@company.com.br",
      country: "BR",
    });
    delay(1000);

    expect(responseCreateCompany).toHaveProperty("statusCode", 401);
  });

  it("Should not be able to create a Company with invalid National Identity", async () => {
    const responseCreateCompany = await request(app)
      .post("/company")
      .send({
        name: "Company 001",
        nationalIdentity: "50.854.279/0001-48",
        email: "a001@company.com.br",
        country: "BR",
      })
      .set({
        Authorization: `Bearer ${token755}`,
      });
    delay(500);

    expect(responseCreateCompany).toHaveProperty("statusCode", 400);

    const { text } = responseCreateCompany;
    const { message } = JSON.parse(text);
    expect(message).toEqual("National Identity is not valid");
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });
});
