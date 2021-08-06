import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import * as userFactory from "../factories/userFactory";
import * as chatFactory from "../factories/chatFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

const test = supertest(app);

describe("GET /chat", () => {
    it("should answer with status 401 unauthorized", async () => {
        const missingHeader = await test.get("/chat");
        const invalidToken = await test.get("/chat").set("Authorization", "Bearer " + "fakeToken");

        expect(missingHeader.status).toBe(401);
        expect(invalidToken.status).toBe(401);
    });
    it("should answer with status 200 and array with messages", async () => {
        const newUser = await userFactory.createUser("123456");
        const newSession = await userFactory.createSession(newUser.id);
        const newMessage = await chatFactory.createMessage(newUser.id);
        const result = await test.get("/chat").set("Authorization", "Bearer " + newSession.token);
        const now = new Date()
        result.body[0].date = now
        newMessage.date = now
        expect(result.status).toBe(200);
        expect(result.body[0]).toEqual(newMessage);
    });
});

describe("POST /chat", () => {
    it("should answer with status 401 unauthorized", async () => {
        const missingHeader = await test.post("/chat");
        const invalidToken = await test.post("/chat").set("Authorization", "Bearer " + "fakeToken");

        expect(missingHeader.status).toBe(401);
        expect(invalidToken.status).toBe(401);
    });
})