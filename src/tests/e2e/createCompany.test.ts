import supertest from "supertest";
import { app } from "@infra/app";

const validUser = {
  name: "John Doe",
  email: "any@mail.com",
  password: "12345678",
};

const address = {
  city: "Any city",
  neighborhood: "Any neighborhood",
  number: "122",
  state: "MG",
  street: "Any street",
  zipCode: "36773-000",
  complement: "Any complement",
};

const token = { authorization: "" };
describe("CreateCompany", () => {
  beforeAll(async () => {
    await supertest(app).post("/signup").send(validUser);
    const authenticate = await supertest(app).post("/signin").send({
      email: "any@mail.com",
      password: "12345678",
    });
    token.authorization = `Bearer ${authenticate.body.token}`;
  });
  it("POST 201: Should create a new company", async () => {
    const companies = await supertest(app).post("/company").set(token).send({
      name: "Test Company",
      cnpj: "16.508.522/0001-39",
    });

    expect(companies.status).toBe(201);
  });

  it("POST 201: Should create a new company with address", async () => {
    const companies = await supertest(app)
      .post("/company")
      .set(token)
      .send({
        name: "Test Company",
        addresses: [address],
      });

    expect(companies.status).toBe(201);
  });

  it("POST 201: Should create a new company with emails", async () => {
    const companies = await supertest(app)
      .post("/company")
      .set(token)
      .send({
        name: "Test Company",
        emails: ["any@mail.com", "any@mail2.com"],
      });

    expect(companies.status).toBe(201);
  });

  it("POST 201: Should create a new company with phone", async () => {
    const companies = await supertest(app)
      .post("/company")
      .set(token)
      .send({
        name: "Test Company",
        phones: ["32999999999", "32999999998"],
      });

    expect(companies.status).toBe(201);
  });
});
