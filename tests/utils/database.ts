import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";
import pokemonsUser from "../../src/entities/PokemonsUser";
import Message from "../../src/entities/Message";

import User from "../../src/entities/User";

export async function clearDatabase() {
    await getRepository(Message).delete({});
    await getRepository(pokemonsUser).delete({});
    await getRepository(User).delete({});
    await getRepository(Pokemon).delete({});
}
