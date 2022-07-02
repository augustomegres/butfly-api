import supertest from "supertest"
import { app } from "@infra/app"
import { createAndAuthenticateUser } from "../mocks/users"

const api = supertest(app)
let userToken: { Authorization: string }
let alternativeUserToken: { Authorization: string }
describe("GetUserCompanies", () => {
  beforeAll(async () => {
    userToken = await createAndAuthenticateUser({ api })

    alternativeUserToken = await createAndAuthenticateUser({
      api,
      user: {
        name: "Alternative User",
        email: "any2@mail.com",
        password: "12345678",
      },
    })

    await supertest(app).post("/companies").set(userToken).send({ name: "Test Company" })

    await supertest(app).post("/companies").set(alternativeUserToken).send({ name: "Alt Company" })
  })

  it("should return a list of user companies", async () => {
    const response = await supertest(app).get("/companies").set(userToken)

    expect(response.status).toBe(200)
    expect(response.body.companies).toHaveLength(1)
  })

  it("should not return a company of another user", async () => {
    const userCompanies = await supertest(app).get("/companies").set(userToken).send()

    const altUserCompanies = await supertest(app).get("/companies").set(alternativeUserToken).send()

    expect(userCompanies.status).toBe(200)
    expect(userCompanies.body.companies).toHaveLength(1)
    expect(userCompanies.body.companies[0].name).toBe("Test Company")

    expect(altUserCompanies.status).toBe(200)
    expect(altUserCompanies.body.companies).toHaveLength(1)
    expect(altUserCompanies.body.companies[0].name).toBe("Alt Company")
  })

  it("should return a 401 if the user is not authenticated", async () => {
    const response = await supertest(app).get("/companies")
    expect(response.status).toBe(401)
  })
})
