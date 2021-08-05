import { Router } from "express";
import * as userController from "../controllers/userConroller";
const router = Router();

router.post("/sign-up", userController.signUp);

export default router