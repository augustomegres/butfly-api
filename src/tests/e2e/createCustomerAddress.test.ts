import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"

const apiButfly = supertest(app)
let token: any
let company: any

const address = { city: "Cataguases", neighborhood: "Bairro", number: "1", state: "MG", street: "Rua Amazonas", zipCode: "36773-582", complement: "" }

describe("Create customer address", () => {
  beforeAll(async () => {
    token = await createAndAuthenticateUser(apiButfly, { name: "Any User", email: "valid@mail.com", password: "12345678" })
    company = await apiButfly.post(`/companies`).set(token).send({ name: "Any Company" })
  })

  test("should be possible to create a customer address", async () => {
    const customer = await apiButfly.post(`/companies/${company.body.uid}/customers`).set(token).send({ name: "Any Customer" })
    const addressResponse = await apiButfly.post(`/companies/${company.body.uid}/customers/${customer.body.uid}/address`).set(token).send(address)
    expect(addressResponse.status).toBe(201)
  })

  test("should not be possible to create a customer address if customer is not from logged user company", async () => {
    const altUser = await createAndAuthenticateUser(apiButfly, { email: "anotherValidMail@mail.com", password: "12345678", name: "Valid User" })
    const customer = await apiButfly.post(`/companies/${company.body.uid}/customers`).set(token).send({ name: "Any Customer" })
    const address = await apiButfly.post(`/companies/${company.body.uid}/customers/${customer.body.uid}/address`).set(altUser)
    expect(address.status).toBe(401)
  })
})
