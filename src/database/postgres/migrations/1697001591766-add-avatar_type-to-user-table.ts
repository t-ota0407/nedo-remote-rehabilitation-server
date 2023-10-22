import { MigrationInterface, QueryRunner } from "typeorm"
import { avatarTypes } from "../../../types/avatarType";

export class AddAvatarTypeToUserTable1697001591766 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE type_avatar AS ENUM (${avatarTypes.map(item => `'${item}'`).join(', ')});`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN latest_avatar_type type_avatar;`
    );
    await queryRunner.query(
      `UPDATE "user" SET latest_avatar_type = '${avatarTypes[0]}' WHERE latest_avatar_type IS NULL;`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN latest_avatar_type SET NOT NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN latest_avatar_type;`
    );
  }

}
