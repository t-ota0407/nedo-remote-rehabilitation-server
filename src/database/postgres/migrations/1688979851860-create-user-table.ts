import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1688979851860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" (
                "uuid" uuid PRIMARY KEY,
                "user_name" varchar(255) NOT NULL,
                "password" varchar(255) NOT NULL,
                "created_at" timestamp NOT NULL
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "user";`
        );
    }

}
