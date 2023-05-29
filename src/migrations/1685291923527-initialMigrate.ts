import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1685291923527 implements MigrationInterface {
    name = 'initialMigrate1685291923527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userContact" RENAME COLUMN "CreatedAt" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "userContact" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "userContact" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "userContact" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "userContact" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "userContact" RENAME COLUMN "createdAt" TO "CreatedAt"`);
    }

}
