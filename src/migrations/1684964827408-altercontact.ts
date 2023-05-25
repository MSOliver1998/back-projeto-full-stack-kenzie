import { MigrationInterface, QueryRunner } from "typeorm";

export class altercontact1684964827408 implements MigrationInterface {
    name = 'altercontact1684964827408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userContact" ("id" SERIAL NOT NULL, "contactId" integer, "userId" integer, CONSTRAINT "PK_0242e2f01e8a45e6cde30ba5fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userContact" ADD CONSTRAINT "FK_fccc791134932cc4ee306cb7f65" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userContact" ADD CONSTRAINT "FK_0d1c5bf77c21013304d3cf7818b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userContact" DROP CONSTRAINT "FK_0d1c5bf77c21013304d3cf7818b"`);
        await queryRunner.query(`ALTER TABLE "userContact" DROP CONSTRAINT "FK_fccc791134932cc4ee306cb7f65"`);
        await queryRunner.query(`DROP TABLE "userContact"`);
    }

}
