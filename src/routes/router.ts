import { Router } from "express";

import pokemonRouter from "./pokemons";
import usersRouter from "./users";

const mainRouter = Router();

mainRouter.use("/pokemons", pokemonRouter);
mainRouter.use("/", usersRouter);

export default mainRouter;