import { MigrationInterface, QueryRunner } from "typeorm"

export class AddIsTemporaryToUserTable1695016675519 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN is_temporary boolean DEFAULT FALSE NOT NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN is_temporary boolean;`
    );
  }

}
