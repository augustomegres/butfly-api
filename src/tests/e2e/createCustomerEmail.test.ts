import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"
const apiButfly = supertest(app)
let userToken: { Authorization: string }
let company: any
let customer: any

describe("Create customer email", () => {
  beforeAll(async () => {
    userToken = await createAndAuthenticateUser(apiButfly, { email: "validMail@mail.com", password: "12345678", name: "Valid User" })
    company = await apiButfly.post("/companies").set(userToken).send({ name: "Valid Company" })
    customer = await apiButfly.post(`/companies/${company.body.uid}/customers`).set(userToken).send({ name: "Valid Customer" })
  })

  test("should be possible do create a new customer email", async () => {
    await supertest(app)
      .post(`/companies/${company.body.uid}/customers/${customer.body.uid}/emails`)
      .send({ email: "any@mail.com" })
      .set(userToken)
      .expect(201)
    const customerRequest = await apiButfly.get(`/companies/${company.body.uid}/customers/${customer.body.uid}`).set(userToken)
    expect(customerRequest.body.emails).toHaveLength(1)
    expect(customerRequest.body.emails[0].email).toBe("any@mail.com")
  })

  test("should not be possible to create a new customer email if company uid is invalid", async () => {
    const customerEmail = await apiButfly
      .post(`/companies/invalid/customers/${customer.body.uid}/emails`)
      .send({ email: "any@mail.com" })
      .set(userToken)
    expect(customerEmail.body.message).toBe("User does not have access to this company")
  })

  test("should throw an error if customer uid is invalid", async () => {
    const customerEmail = await supertest(app)
      .post(`/companies/${company.body.uid}/customers/invalid/emails`)
      .send({ email: "any@mail.com" })
      .set(userToken)
    expect(customerEmail.body.message).toBe("Customer does not exist")
  })

  test("should not be possible to store a new customer email if customer company is different from logged user company", async () => {
    const altUser = await createAndAuthenticateUser(apiButfly, { email: "anotherValidMail@mail.com", password: "12345678", name: "Valid User" })
    const customerEmail = await apiButfly
      .post(`/companies/${company.body.uid}/customers/${customer.body.uid}/emails`)
      .send({ email: "any@mail.com" })
      .set(altUser)
    expect(customerEmail.body.message).toBe("User does not have access to this company")
  })
})
