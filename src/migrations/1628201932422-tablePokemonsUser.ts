import {MigrationInterface, QueryRunner} from "typeorm";

export class tablePokemonsUser1628201932422 implements MigrationInterface {
    name = 'tablePokemonsUser1628201932422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemonsUser" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_342025c2e8fac3278ec07c58062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" ADD CONSTRAINT "FK_751966eef9696d6d03cb91b092c" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" ADD CONSTRAINT "FK_aab3245640c21927cad9be9c1f3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonsUser" DROP CONSTRAINT "FK_aab3245640c21927cad9be9c1f3"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUser" DROP CONSTRAINT "FK_751966eef9696d6d03cb91b092c"`);
        await queryRunner.query(`DROP TABLE "pokemonsUser"`);
    }

}
