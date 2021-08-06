import { Router } from "express";
import * as chatController from "../controllers/chatController";
import authorization from "../middlewares/authorization";
const router = Router();

router.use(authorization);
router.get("/", chatController.getMessages);
router.post("/", chatController.newMessage);

export default router