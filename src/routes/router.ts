import { Router } from "express";

import pokemonRouter from "./pokemons";
import usersRouter from "./users";

const mainRouter = Router();

mainRouter.use("/pokemon", pokemonRouter);
mainRouter.use("/users", usersRouter);

export default mainRouter;