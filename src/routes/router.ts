import { Router } from "express";

import pokemonRouter from "./pokemons";
import usersRouter from "./users";
import { populateDatabase } from "../controllers/pokemonController";

const mainRouter = Router();

mainRouter.use("/pokemons", pokemonRouter);
mainRouter.use("/", usersRouter);
mainRouter.get("/populate", populateDatabase);

export default mainRouter;