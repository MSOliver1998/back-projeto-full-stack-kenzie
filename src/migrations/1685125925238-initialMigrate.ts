import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1685125925238 implements MigrationInterface {
    name = 'initialMigrate1685125925238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userContact" ADD "CreatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "createdAt" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "userContact" DROP COLUMN "CreatedAt"`);
    }

}
