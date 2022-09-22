import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  port: Number(process.env.POSTGRES_HOST_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.POSTGRES_DB_TEST
      : process.env.POSTGRES_DB,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log(`${new Date().getTime()} Data Source has been initialized!`);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
