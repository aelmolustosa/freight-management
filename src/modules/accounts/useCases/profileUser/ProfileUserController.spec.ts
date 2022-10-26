import { IAuthenticatedUserDTO } from "@modules/accounts/dtos/IAuthenticateUserDTO";
import request from "supertest";

import { AppError } from "@shared/errors/AppError";
import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/DataSource";
import { delay } from "@shared/utils";

interface IBody {
  userAuthenticated: IAuthenticatedUserDTO;
}

jest.setTimeout(30000);

describe("ProfileUserController", () => {
  let token732: string;
  let token511: string;

  beforeAll(async () => {
    await AppDataSource.initialize();
    await delay(7000);
    await AppDataSource.runMigrations();

    // 0.create a user A
    await request(app).post("/users").send({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
      fullName: "Aelmo Lustosa da Silva",
      profile: "Admin",
      companyId: "00111222444455",
    });
    await delay(500);
    // 1.login user A
    const { body: body732 } = await request(app).post("/login").send({
      nationalIdentity: "73290726134",
      password: "y3*072PU",
    });
    await delay(500);

    // 2.save token;
    ({ token: token732 } = (body732 as IBody).userAuthenticated);

    // 0.create a user B
    await request(app).post("/users").send({
      nationalIdentity: "51198958081",
      password: "12345678",
      fullName: "Lilija Firmin",
      profile: "Driver",
      companyId: "00111222444455",
    });
    await delay(500);

    // 1.login user B
    const { body: body511 } = await request(app).post("/login").send({
      nationalIdentity: "51198958081",
      password: "12345678",
    });
    await delay(500);

    // 2.save token;
    ({ token: token511 } = (body511 as IBody).userAuthenticated);
  });

  it("Should be able to get profile from your user", async () => {
    // 1.try get profile user;
    const responseProfile = await request(app)
      .get("/users/profile")
      .send({
        nationalIdentity: "73290726134",
      })
      .set({
        Authorization: `Bearer ${token732}`,
      });

    delay(500);

    const { profile } = responseProfile.body;
    expect(profile).toHaveProperty("id");
    expect(profile).toHaveProperty("nationalIdentity", "73290726134");
  });

  it("Should be able to get profile from another user if the logged user is an admin", async () => {
    const responseProfile = await request(app)
      .get("/users/profile")
      .send({
        nationalIdentity: "51198958081",
      })
      .set({
        Authorization: `Bearer ${token732}`,
      });

    delay(500);

    const { profile } = responseProfile.body;
    expect(profile).toHaveProperty("id");
    expect(profile).toHaveProperty("nationalIdentity", "51198958081");
  });

  it("Should not be able to get profile from another user if the logged user is not an admin", async () => {
    const reponse = await request(app)
      .get("/users/profile")
      .send({
        nationalIdentity: "73290726134",
      })
      .set({
        Authorization: `Bearer ${token511}`,
      });
    delay(500);

    expect(reponse.body).toHaveProperty("message", "Not allowed");
  });
});
