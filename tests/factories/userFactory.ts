import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

export async function createUser(password: string) {
    const user = {
        email: "email@email.com",
        password
    };

    const newUser = await getRepository(User).save({
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)
    });

    return newUser;
}

export async function createSession(userId: number) {
    const session = {
        userId,
        token: "1234567890"
    };

    await getRepository(Session).save({
        userId: userId,
        token: session.token
    });

    return session;
}

export async function getAll() {
    return await getRepository(User).find();
}