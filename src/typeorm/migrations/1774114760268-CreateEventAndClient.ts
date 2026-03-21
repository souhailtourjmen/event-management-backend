import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventAndClient1774114760268 implements MigrationInterface {
    name = 'CreateEventAndClient1774114760268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "date" TIMESTAMP NOT NULL, "location" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_clients_client" ("eventId" uuid NOT NULL, "clientId" uuid NOT NULL, CONSTRAINT "PK_63ea58a167f20dc05e3d16e08b9" PRIMARY KEY ("eventId", "clientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6df00ad26b0fcbff8cc091fb16" ON "event_clients_client" ("eventId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6bc3051ec2802d110ff084e37a" ON "event_clients_client" ("clientId") `);
        await queryRunner.query(`ALTER TABLE "event_clients_client" ADD CONSTRAINT "FK_6df00ad26b0fcbff8cc091fb167" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_clients_client" ADD CONSTRAINT "FK_6bc3051ec2802d110ff084e37a3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_clients_client" DROP CONSTRAINT "FK_6bc3051ec2802d110ff084e37a3"`);
        await queryRunner.query(`ALTER TABLE "event_clients_client" DROP CONSTRAINT "FK_6df00ad26b0fcbff8cc091fb167"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6bc3051ec2802d110ff084e37a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6df00ad26b0fcbff8cc091fb16"`);
        await queryRunner.query(`DROP TABLE "event_clients_client"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
