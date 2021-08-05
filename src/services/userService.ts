import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import User from "../entities/User";
import Session from "../entities/Session";

export async function getUsers() {
    const users = await getRepository(User).find({
        select: ["id", "email"]
    });

    return users;
}

export async function createUser(user: { email: string, password: string, confirmPassword: string }) {
    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = await getRepository(User).save(user);
    return { id: newUser.id, email: newUser.email };
}

export async function getUserByEmail(email: string) {
    const user = await getRepository(User).findOne({
        where: { email }
    });

    return user;
}

export async function validateUser(email: string, password: string) {
    const user = await getRepository(User).findOne({
        where: { email }
    });

    if (!user) {
        return { user, isValid: false };
    }

    return { user, isValid: bcrypt.compareSync(password, user.password) };
}

export async function signIn(user: User) {
    const existingSession = await getRepository(Session).findOne({ where: { userId: user.id } });
    const token = uuidv4();
    if (existingSession) {
        await getRepository(Session).save({ id: existingSession.id, userId: user.id, token });
        return token;
    }
    await getRepository(Session).save({ userId: user.id, token });
    return token;
}