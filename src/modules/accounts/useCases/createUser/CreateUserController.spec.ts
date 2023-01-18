import request from "supertest";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/DataSource";
import { delay } from "@shared/utils";

jest.setTimeout(30000);

describe("Create User Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await delay(7000);
    await AppDataSource.runMigrations();
  });

  it("Should be able to create a user", async () => {
    const responsePostUsers = await request(app).post("/users").send({
      nationalIdentity: "75598745178",
      password: "y3*072PU",
      fullName: "Euclides Miguela",
      profile: "Admin",
      companyId: "00111222444455",
    });
    await delay(700);

    expect(responsePostUsers).toHaveProperty("status", 201);
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });
});
