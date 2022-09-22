import request from "supertest";
import { stringify } from "ts-jest";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/DataSource";
import { delay } from "@shared/utils";

jest.setTimeout(30000);

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await delay(7000);
    await AppDataSource.runMigrations();

    await request(app).post("/users").send({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
      fullName: "Aelmo Lustosa da Silva",
      profile: "Admin",
      companyId: "00111222444455",
    });
    await delay(500);
  });

  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
    });
    await delay(500);

    expect(response).toHaveProperty("status", 200);
  });

  it("Should not be able to login with wrong password", async () => {
    const response = await request(app).post("/login").send({
      nationalIdentity: "73290726134",
      password: "y3*072P1",
    });
    await delay(500);

    expect(response).toHaveProperty("status", 400);
    expect(response).toHaveProperty(
      "text",
      stringify({
        message: "User and password does not match",
      })
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });
});
