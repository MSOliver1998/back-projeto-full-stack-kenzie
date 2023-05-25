import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1684949344459 implements MigrationInterface {
    name = 'initial1684949344459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(60) NOT NULL, "telefone" character varying(9) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(60) NOT NULL, "telefone" character varying(9) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_categories_contacts" ("usersId" integer NOT NULL, "contactsId" integer NOT NULL, CONSTRAINT "PK_21b89d4943227168adac0e70bb7" PRIMARY KEY ("usersId", "contactsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe03efd0a512804be106da492d" ON "users_categories_contacts" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3b3ebb09a94a41e83210e350e" ON "users_categories_contacts" ("contactsId") `);
        await queryRunner.query(`ALTER TABLE "users_categories_contacts" ADD CONSTRAINT "FK_fe03efd0a512804be106da492d0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_categories_contacts" ADD CONSTRAINT "FK_d3b3ebb09a94a41e83210e350e6" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_categories_contacts" DROP CONSTRAINT "FK_d3b3ebb09a94a41e83210e350e6"`);
        await queryRunner.query(`ALTER TABLE "users_categories_contacts" DROP CONSTRAINT "FK_fe03efd0a512804be106da492d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3b3ebb09a94a41e83210e350e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe03efd0a512804be106da492d"`);
        await queryRunner.query(`DROP TABLE "users_categories_contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
