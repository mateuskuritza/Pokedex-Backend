import { Request, Response } from "express";
import * as chatService from "../services/chatService";

export async function getMessages(req: Request, res: Response) {
    const messages = await chatService.getMessages();
    res.send(messages);
}

export async function newMessage(req: Request, res: Response) {
    const { text } = req.body as { text: string };
    const { userId } = res.locals;
    if (!text) return res.status(400).send("Null message!");
    await chatService.newMessage(text, userId);
    res.sendStatus(201);
}