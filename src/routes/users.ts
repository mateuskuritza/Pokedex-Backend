import { Router } from "express";
import * as userController from "../controllers/userController";
const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);

export default router