import { app } from "@infra/app";
import supertest from "supertest";
import { createAndAuthenticateUser } from "../mocks/users";

const butflyApi = supertest(app);
let token: { authorization: string };
let alternativeToken: { authorization: string };

describe("Me", () => {
  beforeAll(async () => {
    token = await createAndAuthenticateUser(butflyApi, {
      name: "John Doe",
      email: "any@mail.com",
      password: "12345678",
    });

    alternativeToken = await createAndAuthenticateUser(butflyApi, {
      name: "Jane Doe",
      email: "any2@mail.com",
      password: "12345678",
    });
    await butflyApi
      .post("/companies")
      .send({ name: "company" })
      .set(alternativeToken);
  });

  it("should return logged user", async () => {
    const response = await butflyApi.get("/me").set(token);

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("John Doe");
    expect(response.body.user.email).toBe("any@mail.com");
    expect(response.body.companies).toHaveLength(0);
    expect(response.body.user.password).toBeUndefined();
  });

  it("should return logged user with companies", async () => {
    const response = await butflyApi.get("/me").set(alternativeToken);

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("Jane Doe");
    expect(response.body.user.email).toBe("any2@mail.com");
    expect(response.body.companies).toHaveLength(1);
    expect(response.body.user.password).toBeUndefined();
    expect(response.body.companies[0].name).toBe("company");
  });
});
