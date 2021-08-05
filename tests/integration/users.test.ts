import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import * as userFactory from "../factories/userFactory";
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

describe("POST /sign-up", () => {
    it("should answer with status 400 invalid body", async () => {
        const missingEmail = await test.post("/sign-up").send({ email: "", password: "1234", confirmPassword: "1234" });
        const missingPassword = await test.post("/sign-up").send({ email: "fake@fake.com", password: "", confirmPassword: "1234" });
        const invalidEmail = await test.post("/sign-up").send({ email: "fake", password: "1234", confirmPassword: "1234" });
        const invalidConfirmPassword = await test.post("/sign-up").send({ email: "fake@fake.com", password: "1234", confirmPassword: "1233" });

        expect(missingEmail.status).toBe(400);
        expect(invalidEmail.status).toBe(400);
        expect(missingPassword.status).toBe(400);
        expect(invalidConfirmPassword.status).toBe(400);
    });
    it("should answer with status 201 and create new user", async () => {
        const beforeSize = await userFactory.getAll();
        const result = await test.post("/sign-up").send({ email: "fake@fake.com", password: "1234", confirmPassword: "1234" });
        const afterSize = await userFactory.getAll();
        expect(beforeSize.length).toBe(afterSize.length - 1);
        expect(result.status).toBe(201);
    });
});

describe("POST /sign-in", () => {
    it("should answer with status 400 invalid body", async () => {
        const missingEmail = await test.post("/sign-in").send({ email: "", password: "1234" });
        const missingPassword = await test.post("/sign-in").send({ email: "fake@fake.com", password: "" });
        const invalidEmail = await test.post("/sign-in").send({ email: "fake", password: "1234" });

        expect(missingEmail.status).toBe(400);
        expect(invalidEmail.status).toBe(400);
        expect(missingPassword.status).toBe(400);
    });
    it("should answer with status 401 wrong email or password", async () => {
        const newUser = await userFactory.createUser("123456");
        const wrongEmail = await test.post("/sign-in").send({ email: "fake@fake.com", password: "123456" });
        const wrongPassword = await test.post("/sign-in").send({ email: newUser.email, password: "fake" });

        expect(wrongEmail.status).toBe(401);
        expect(wrongPassword.status).toBe(401);
    });
    it("should answer with status 200 and session token", async () => {
        const newUser = await userFactory.createUser("123456");
        const result = await test.post("/sign-in").send({ email: newUser.email, password: "123456" });
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("token");
    });
});

/*
it("should answer with status 400 invalid body", async () => {
    const user = await createUser();

    const response = await supertest(app).get("");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: user.email
        })
      ])
    );

    expect(response.status).toBe(200);
  });
  */