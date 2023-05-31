import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1685572623365 implements MigrationInterface {
    name = 'initialMigrate1685572623365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(60) NOT NULL, "telefone" character varying(12) NOT NULL, "password" character varying(90) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userContact" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "contactId" integer, "userId" integer, CONSTRAINT "PK_0242e2f01e8a45e6cde30ba5fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(60) NOT NULL, "telefone" character varying(12) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userContact" ADD CONSTRAINT "FK_fccc791134932cc4ee306cb7f65" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userContact" ADD CONSTRAINT "FK_0d1c5bf77c21013304d3cf7818b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userContact" DROP CONSTRAINT "FK_0d1c5bf77c21013304d3cf7818b"`);
        await queryRunner.query(`ALTER TABLE "userContact" DROP CONSTRAINT "FK_fccc791134932cc4ee306cb7f65"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "userContact"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
