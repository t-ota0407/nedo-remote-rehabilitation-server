import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateRehabilitationSaveDataTable1690856730632 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rehabilitation_save_data" (
        "uuid" uuid PRIMARY KEY,
        "user_uuid" uuid NOT NULL,
        "sharpened_knife" bigint NOT NULL,
        "created_at" timestamp NOT NULL
      );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "rehabilitation_save_data";`
    );
  }

}
