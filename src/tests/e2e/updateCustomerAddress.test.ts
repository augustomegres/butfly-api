import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"

const apiButfly = supertest(app)

let userToken: any
let company: any
let customer: any

describe("UpdateCustomerAddress", () => {
  beforeAll(async () => {
    userToken = await createAndAuthenticateUser({ api: apiButfly, user: { email: "validMail@mail.com", password: "12345678", name: "Valid User" } })
    company = await apiButfly.post("/companies").set(userToken).send({ name: "Valid Company" })
    customer = await apiButfly
      .post(`/companies/${company.body.uid}/customers`)
      .set(userToken)
      .send({
        name: "Valid Customer",
        addresses: [
          {
            street: "any",
            number: "any",
            complement: "any",
            neighborhood: "any",
            city: "any",
            state: "MG",
            zipCode: "36773-000",
          },
        ],
      })
  })
  test("Should be possible to update a customer address street", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ street: "alternative" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].street).toBe("alternative")
  })

  test("Should be possible to update a customer address number", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ number: "Alternative number" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].number).toBe("Alternative number")
  })

  test("Should be possible to update a customer address neighborhood", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ neighborhood: "Alternative neighborhood" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].neighborhood).toBe("Alternative neighborhood")
  })

  test("Should be possible to update a customer address complement", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ complement: "Alternative complement" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].complement).toBe("Alternative complement")
  })

  test("Should be possible to update a customer address complement", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ city: "Alternative city" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].city).toBe("Alternative city")
  })

  test("Should be possible to update a customer address complement", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ state: "RJ" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].state).toBe("RJ")
  })

  test("Should be possible to update a customer address complement", async () => {
    const update = await apiButfly
      .put(`/companies/${company.body.uid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(userToken)
      .send({ zipCode: "12345-678" })
    expect(update.status).toBe(200)
    const updatedCustomer = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(updatedCustomer.body.addresses[0].zipCode).toBe("12345-678")
  })
})
