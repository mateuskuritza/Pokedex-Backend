import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";
import pokemonsUser from "../../src/entities/PokemonsUser";

import User from "../../src/entities/User";

export async function clearDatabase() {
    await getRepository(pokemonsUser).delete({});
    await getRepository(User).delete({});
    await getRepository(Pokemon).delete({});
}
