import { Request, Response } from "express";
import * as pokemonService from "../services/pokemonService";
import axios from "axios";

export async function getAll(req: Request, res: Response) {
    const { userId } = res.locals;
    const allPokemons = await pokemonService.getAll(userId);
    res.status(200).send(allPokemons);
}

export async function populateDatabase(req: Request, res: Response) {
    const pokemons: any[] = [];
    // descriptions limit 807
    for (let i = 1; i <= 456; i++) {
        const pokeInfos = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)).data;
        console.log(i);
        let description = "Without description";

        try {
            const descriptionData = await axios.get(`https://pokeapi.glitch.me/v1/pokemon/${i}`);
            if (descriptionData.status !== 404) {
                description = descriptionData.data[0].description
            }
        } catch (err) {
            //console.log(err);
        }

        const formatedInfos = {
            id: pokeInfos.id,
            name: pokeInfos.name,
            number: pokeInfos.order,
            image: pokeInfos.sprites.front_default,
            weight: pokeInfos.weight,
            height: pokeInfos.height,
            baseExp: pokeInfos.base_experience,
            description: description
        }
        pokemons.push(formatedInfos)
    }
    await pokemonService.saveAll(pokemons);
    res.send(pokemons);
}