import {MigrationInterface, QueryRunner} from "typeorm";

export class removeColumnMyPokemonInPokemonEntity1628195484793 implements MigrationInterface {
    name = 'removeColumnMyPokemonInPokemonEntity1628195484793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
    }

}
