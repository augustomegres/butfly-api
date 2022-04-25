import { app } from "@infra/app";
import supertest from "supertest";

const validUser = {
  name: "John Doe",
  email: "any@mail.com",
  password: "12345678",
};

describe("AuthenticateUser", () => {
  beforeAll(async () => {
    await supertest(app).post("/signup").send(validUser);
  });

  it("POST 200: should authenticate an user", async () => {
    const authenticate = await supertest(app).post("/signin").send({
      email: "any@mail.com",
      password: "12345678",
    });

    expect(authenticate.status).toBe(200);
    expect(authenticate.body).toHaveProperty("token");
  });

  it("POST 404: should not authenticate an user with if email not exists", async () => {
    const authenticate = await supertest(app).post("/signin").send({
      email: "unexistent@mail.com",
      password: "12345678",
    });

    expect(authenticate.status).toBe(404);
    expect(authenticate.body.status).toBe("error");
    expect(authenticate.body.message).toBe("User not found.");
  });

  it("POST 401: should not authenticate an user with if password is wrong", async () => {
    const authenticate = await supertest(app).post("/signin").send({
      email: "any@mail.com",
      password: "wrong-password",
    });

    expect(authenticate.status).toBe(401);
    expect(authenticate.body.status).toBe("error");
    expect(authenticate.body.message).toBe("Invalid password.");
  });
});
