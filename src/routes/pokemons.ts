import { Router } from "express";
import authorization from "../middlewares/authorization";
import * as pokemonController from "../controllers/pokemonController";

const router = Router();

router.use(authorization);

router.get("/", pokemonController.getAll);

export default router