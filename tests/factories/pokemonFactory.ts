import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";

export async function createPokemon(): Promise<Pokemon> {
    const pokemonRepository = getRepository(Pokemon);
    const pokemon = {
        id: 1,
        name: "fakeName",
        number: 1,
        image: "fakeImage",
        weight: 2,
        height: 3,
        baseExp: 4,
        description: "fakeDescription"
    }
    return await pokemonRepository.save(pokemon);
}