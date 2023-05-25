import { MigrationInterface, QueryRunner } from "typeorm";

export class altercontact1684953786684 implements MigrationInterface {
    name = 'altercontact1684953786684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_contact_contacts" ("usersId" integer NOT NULL, "contactsId" integer NOT NULL, CONSTRAINT "PK_395f4452e4ce2d3a4950332fafe" PRIMARY KEY ("usersId", "contactsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37fbb5aaa93789325df2fbcaa8" ON "users_contact_contacts" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_69baef38c58de9481a14543921" ON "users_contact_contacts" ("contactsId") `);
        await queryRunner.query(`ALTER TABLE "users_contact_contacts" ADD CONSTRAINT "FK_37fbb5aaa93789325df2fbcaa83" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_contact_contacts" ADD CONSTRAINT "FK_69baef38c58de9481a14543921e" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_contact_contacts" DROP CONSTRAINT "FK_69baef38c58de9481a14543921e"`);
        await queryRunner.query(`ALTER TABLE "users_contact_contacts" DROP CONSTRAINT "FK_37fbb5aaa93789325df2fbcaa83"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69baef38c58de9481a14543921"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37fbb5aaa93789325df2fbcaa8"`);
        await queryRunner.query(`DROP TABLE "users_contact_contacts"`);
    }

}
