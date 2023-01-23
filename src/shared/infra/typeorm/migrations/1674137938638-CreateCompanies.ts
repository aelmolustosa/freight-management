import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanies1674137938638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "companies",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "nationalIdentity",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "country",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
