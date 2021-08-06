import { getRepository, MoreThan } from "typeorm";
import Message from "../entities/Message";

export async function getMessages(): Promise<Message[]> {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    // last 24 hours ( 1 day )
    const messages = await getRepository(Message).find({ select: ["id", "userId", "text", "date"], where: { date: MoreThan(date) } });
    return messages;
}

export async function newMessage(message: string, userId: number): Promise<void> {
    const newMessage = new Message();
    newMessage.userId = userId;
    newMessage.text = message;
    newMessage.date = new Date();
    await getRepository(Message).save(newMessage);
}