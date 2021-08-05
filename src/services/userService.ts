import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";

import User from "../entities/User";

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