import supertest from "supertest";
import { app } from "@infra/app";

describe("CreateUser", () => {
  it("POST 201: should create an user", async () => {
    const user = await supertest(app).post("/signup").send({
      name: "Test User",
      email: "any@mail.com",
      password: "12345678",
    });
    expect(user.body).toHaveProperty("uid");
    expect(user.body).toHaveProperty("name");
    expect(user.body).toHaveProperty("email");
    expect(user.body).not.toHaveProperty("password");
  });

  it("POST 400: should return an error if the user already exists", async () => {
    await supertest(app).post("/signup").send({
      name: "Test User",
      email: "any@mail.com",
      password: "12345678",
    });
    const user2 = await supertest(app).post("/signup").send({
      name: "Test User",
      email: "any@mail.com",
      password: "12345678",
    });
    expect(user2.body.status).toBe("error");
    expect(user2.body.message).toBe("Email already registered.");
  });

  it("POST 400: should not be possible to create an user if password has less than 8 characters", async () => {
    const user = await supertest(app).post("/signup").send({
      name: "Test User",
      email: "any@mail.com",
      password: "1234567",
    });
    expect(user.body.status).toBe("error");
    expect(user.body.message).toBe("Password must have at least 8 characters.");
  });

  it("POST 400: should not be possible to create an user if email is invalid", async () => {
    const user = await supertest(app).post("/signup").send({
      name: "Test User",
      email: "anymail.com",
      password: "12345678",
    });
    expect(user.body.status).toBe("error");
    expect(user.body.message).toBe("Email is invalid.");
  });
});
