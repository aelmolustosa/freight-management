import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1661868114830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "national_identity",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "full_name",
            type: "varchar",
          },
          {
            name: "profile",
            type: "varchar",
          },
          {
            name: "company_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
