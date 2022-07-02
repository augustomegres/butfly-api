import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"

const apiButfly = supertest(app)

let companyUid: string
let token: { Authorization: string }
describe("DeleteCustomerPhone", () => {
  beforeAll(async () => {
    token = await createAndAuthenticateUser({ api: apiButfly })
    const request = await apiButfly.post("/companies").send({ name: "Test Company" }).set(token)
    companyUid = request.body.uid
  })
  test("DELETE 200: should be possible do delete a customer phone", async () => {
    const customer = await apiButfly
      .post(`/companies/${companyUid}/customers`)
      .set(token)
      .send({ name: "Customer name", phones: ["32988338833"] })
    const deletePhone = await apiButfly
      .delete(`/companies/${companyUid}/customers/${customer.body.uid}/phones/${customer.body.phones[0].uid}`)
      .set(token)
    expect(deletePhone.status).toBe(200)
  })
})
