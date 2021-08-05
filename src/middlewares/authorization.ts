import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Session from '../entities/Session';

export default async function authorization(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send("Missing authorization header");
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).send("Missing bearer token");
    const user = await getRepository(Session).findOne({ token });
    if (!user) return res.status(401).send("Invalid token");
    res.locals.userId = user.id;
    next();
}