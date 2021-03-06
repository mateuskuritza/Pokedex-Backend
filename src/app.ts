import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

const app = express();
app.use(cors());
app.use(express.json());

import errorHandler from "./middlewares/errorHandler";
app.use(errorHandler);

import router from "./routes/router";
app.use("/", router);

export async function init() {
    await connectDatabase();
}

const httpServer = require("http").Server(app);

export default httpServer;