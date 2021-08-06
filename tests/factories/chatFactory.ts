import { getRepository } from "typeorm";
import Message from "../../src/entities/Message";

export async function createMessage(userId: number): Promise<Message> {
    const messageRepository = getRepository(Message);
    const date = new Date()
    const message = {
        userId,
        text: "Test message",
        date
    }
    return await messageRepository.save(message);
}