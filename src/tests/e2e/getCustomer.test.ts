import { user } from "@infra/http/routes/user.routes"
import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"

const apiButfly = supertest(app)
let company: any
let userToken: any

describe("GetCustomer", () => {
  beforeAll(async () => {
    userToken = await createAndAuthenticateUser({ api: apiButfly, user: { name: "Any User", email: "user@mail.com", password: "12345678" } })
    company = await apiButfly.post(`/companies`).send({ name: "Any company" }).set(userToken)
  })

  it("POST 200: Should be possible to get a customer", async () => {
    const newCustomer = await apiButfly.post(`/companies/${company.body.uid}/customers`).set(userToken).send({ name: "Any Customer" })
    const customer = await apiButfly.get(`/companies/${company.body.uid}/customers/${newCustomer.body.uid}`).set(userToken)
    expect(customer.status).toBe(200)
    expect(customer.body.uid).toBe(newCustomer.body.uid)
    expect(customer.body.name).toBe(newCustomer.body.name)
    expect(customer.body.phones).toBeDefined()
    expect(customer.body.emails).toBeDefined()
    expect(customer.body.addresses).toBeDefined()
  })

  it("POST 200: Should throw an error if customer not exists", async () => {
    const customer = await apiButfly.get(`/companies/${company.body.uid}/customers/404`).set(userToken)
    expect(customer.status).toBe(404)
  })
})
