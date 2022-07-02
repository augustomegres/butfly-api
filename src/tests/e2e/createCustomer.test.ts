import supertest from "supertest"
import { app } from "@infra/app"
import { validUser } from "../mocks/users"

const token = { authorization: "" }
const token2 = { authorization: "" }
let companyUid: string
describe("Create Customer", () => {
  beforeAll(async () => {
    await supertest(app).post("/signup").send(validUser)
    const authenticate = await supertest(app).post("/signin").send({
      email: "any@mail.com",
      password: "12345678",
    })
    token.authorization = `Bearer ${authenticate.body.token}`
    const company = await supertest(app).post("/companies").set(token).send({
      name: "Any Company",
    })
    companyUid = company.body.uid

    await supertest(app)
      .post("/signup")
      .send({ ...validUser, email: "any2@mail.com" })

    const authenticate2 = await supertest(app).post("/signin").send({
      email: "any2@mail.com",
      password: "12345678",
    })
    token2.authorization = `Bearer ${authenticate2.body.token}`
  })
  it("should be possible to create a customer", async () => {
    const response = await supertest(app).post(`/companies/${companyUid}/customers`).set(token).send({
      name: "Any Customer",
      surname: "Test",
      observations: "Test",
    })

    expect(response.status).toBe(201)
  })

  it("should throw an error if provided company is not from user", async () => {
    const response = await supertest(app).post(`/companies/${companyUid}/customers`).set(token2).send({
      name: "Any Customer",
      surname: "Test",
      observations: "Test",
    })

    expect(response.body.message).toBe("User does not have access to this company")
    expect(response.status).toBe(401)
  })
})
