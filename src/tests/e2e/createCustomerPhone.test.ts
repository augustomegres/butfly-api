import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"

const apiButfly = supertest(app)
let token: any
let company: any

describe("Create customer phone", () => {
  beforeAll(async () => {
    token = await createAndAuthenticateUser({ api: apiButfly, user: { name: "Any User", email: "valid@mail.com", password: "12345678" } })
    company = await apiButfly.post(`/companies`).set(token).send({ name: "Any Company" })
  })

  test("should be possible to create a customer phone", async () => {
    const customer = await apiButfly.post(`/companies/${company.body.uid}/customers`).set(token).send({ name: "Any Customer" })
    const phone = await apiButfly
      .post(`/companies/${company.body.uid}/customers/${customer.body.uid}/phones`)
      .set(token)
      .send({ phone: "32999999999" })
    expect(phone.status).toBe(201)
    expect(phone.body.phone).toBe("32999999999")
    expect(phone.body.uid).toBeDefined()
  })

  test("should not be possible to create a customer phone if customer is not from logged user company", async () => {
    const customer = await apiButfly.post(`/companies/${company.body.uid}/customers`).set(token).send({ name: "Any Customer" })
    const phone = await apiButfly.post(`/companies/invalid/customers/${customer.body.uid}/phones`).set(token).send({ phone: "32999999999" })
    expect(phone.status).toBe(401)
    expect(phone.body.message).toBe("User does not have access to this company")
  })
})
