import supertest from "supertest"
import { app } from '@infra/app'
import { createAndAuthenticateUser } from "../mocks/users"

const butflyApi = supertest(app)
let companyUid: any
let userToken: { Authorization: string }

describe('GetCustomers', () => {
  beforeAll(async () => {
    userToken = await createAndAuthenticateUser(butflyApi, { name: 'John Doe', email: 'john@mail.com', password: '12345678' })
    const company = await butflyApi.post('/companies').send({ name: 'Testing' }).set(userToken)
    companyUid = company.body.uid
  })

  it('Should return an empty array if customer not exists', async () => {
    const request = await butflyApi.get(`/companies/${companyUid}/customers`).set(userToken)

    expect(request.status).toBe(200)
    expect(request.body).toHaveProperty('rows')
    expect(request.body.rows).toBeInstanceOf(Array)
    expect(request.body.rows.length).toBe(0)
    expect(request.body.page).toBe(1)
    expect(request.body.totalPages).toBe(0)
  })

  it('Should return an array with customers', async () => {
    await butflyApi.post(`/companies/${companyUid}/customers`).set(userToken).send({ name: 'Valid Customer' })
    const request = await butflyApi.get(`/companies/${companyUid}/customers`).set(userToken)

    expect(request.status).toBe(200)
    expect(request.body).toHaveProperty('rows')
    expect(request.body.rows).toBeInstanceOf(Array)
    expect(request.body.rows.length).toBe(1)
    expect(request.body.page).toBe(1)
    expect(request.body.totalPages).toBe(1)
  })
})