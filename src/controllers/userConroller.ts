import { Request, Response } from "express";
import * as userService from "../services/userService";
import newUserSchema from "../schemas/newUser";

export async function signUp(req: Request, res: Response) {
    const { error } = newUserSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const existingEmail = await userService.getUserByEmail(req.body.email);
    if (existingEmail) return res.status(409).send({ error: "Email already exists" });
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
}