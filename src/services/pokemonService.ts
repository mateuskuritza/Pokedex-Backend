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

export async function addFavoritePokemon(userId: number, pokemonId: number) {
    const myPokemons = await getRepository(pokemonsUser).find({ where: { userId } });
    const myIds = myPokemons.map(p => p.pokemonId);
    if (!myIds.includes(pokemonId)) {
        await getRepository(pokemonsUser).save({ userId, pokemonId });
        return 200;
    }
    return 409;
}

export async function removeFavoritePokemon(userId: number, pokemonId: number) {
    const relation = await getRepository(pokemonsUser).findOne({ where: { userId, pokemonId } });
    if (relation) {
        await getRepository(pokemonsUser).remove(relation);
        return 200;
    }
    return 404;
}