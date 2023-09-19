import { MigrationInterface, QueryRunner } from "typeorm"
import { rehabilitationConditions } from "../../../types/rehabilitationCondition";

export class CreateRehabilitationResultTable1688980534564 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE type_rehabilitation_condition  AS ENUM (${rehabilitationConditions.map(item => `'${item}'`).join(', ')});`
    );
    await queryRunner.query(
      `CREATE TABLE "rehabilitation_result" (
        "uuid" uuid PRIMARY KEY,
        "created_at" timestamp NOT NULL,
        "user_uuid" uuid NOT NULL,
        "rehabilitation_condition" type_rehabilitation_condition NOT NULL,
        "rehabilitation_started_at" timestamp NOT NULL,
        "rehabilitation_finished_at" timestamp NOT NULL,
        "reaching_times" bigint NOT NULL,
        "sharpened_knife_before" bigint NOT NULL,
        "sharpened_knife_after" bigint NOT NULL
      );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "rehabilitation_result";`
    );
  }

}
