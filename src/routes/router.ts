import { Router } from "express";

import pokemonRouter from "./pokemons";
import usersRouter from "./users";
import chatRouter from "./chat";
import { populateDatabase } from "../controllers/pokemonController";

const mainRouter = Router();

mainRouter.use("/pokemons", pokemonRouter);
mainRouter.use("/my-pokemons", pokemonRouter);
mainRouter.use("/", usersRouter);
mainRouter.use("/chat", chatRouter);
mainRouter.get("/populate", populateDatabase);

export default mainRouter;