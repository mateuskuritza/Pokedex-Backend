import {MigrationInterface, QueryRunner} from "typeorm";

export class tableMessageDate1628280799433 implements MigrationInterface {
    name = 'tableMessageDate1628280799433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "date"`);
    }

}
