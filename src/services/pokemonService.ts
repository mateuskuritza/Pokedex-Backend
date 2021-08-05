import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import pokemonsUser from "../entities/PokemonsUser";

export async function getAll(userId: number) {
    const pokemons = await getRepository(Pokemon).find();
    const formatedPokemons = pokemons.map(p => {
        return { ...p, "inMyPokemons": false }
    })
    const myPokemons = await getRepository(pokemonsUser).find({ where: { userId } });
    const myIds = myPokemons.map(p => p.pokemonId);
    for (const pokemon of formatedPokemons) {
        pokemon.inMyPokemons = myIds.includes(pokemon.id);
    }
    return formatedPokemons;
}

export async function saveAll(data: Pokemon[]) {
    await getRepository(Pokemon).save(data);
}