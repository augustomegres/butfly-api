import { app } from "@infra/app"
import supertest from "supertest"
import { createAndAuthenticateUser } from "../mocks/users"

const apiButfly = supertest(app)
let token: { Authorization: string }
let companyUid: string

describe("DeleteCustomerAddress", () => {
  beforeAll(async () => {
    token = await createAndAuthenticateUser({ api: apiButfly })
    const request = await apiButfly.post("/companies").send({ name: "Test Company" }).set(token)
    companyUid = request.body.uid
  })

  test("DELETE 200: should be possible do delete a customer address", async () => {
    const customer = await apiButfly
      .post(`/companies/${companyUid}/customers`)
      .set(token)
      .send({
        name: "Customer name",
        addresses: [
          {
            street: "Rua Teste",
            number: "123",
            neighborhood: "Bairro Teste",
            city: "Cidade Teste",
            state: "SP",
            zipCode: "12345-678",
          },
        ],
      })
    const deleteAddress = await apiButfly
      .delete(`/companies/${companyUid}/customers/${customer.body.uid}/addresses/${customer.body.addresses[0].uid}`)
      .set(token)
    expect(deleteAddress.status).toBe(200)
  })
})
