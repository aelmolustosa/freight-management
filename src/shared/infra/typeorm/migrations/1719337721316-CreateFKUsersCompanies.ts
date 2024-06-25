import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateFKUsersCompanies1719337721316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "company_id",
      new TableColumn({
        name: "company_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["company_id"],
        referencedTableName: "companies",
        referencedColumnNames: ["company_id"],
        name: "FK_users_companies",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "FK_users_companies");
  }
}
