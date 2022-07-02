import supertest from "supertest"
import { app } from "@infra/app"

const product = {
  name: "Produto",
  description: "test",
  variants: [
    {
      uid: "c459bc19-ab76-4813-93a4-ea682c763d66",
      images: ["https://via.placeholder.com/300.png/09f/fff"],
      properties: [
        {
          key: "Peso",
          value: "12 Kg",
        },
        {
          key: "Dimensões",
          value: "L12xM2xA4",
        },
      ],
      price: 1200,
      quantity: 0,
    },
  ],
}

const validUser = {
  name: "John Doe",
  email: "any@mail.com",
  password: "12345678",
}

const token = { authorization: "" }
describe("CreateProduct", () => {
  beforeAll(async () => {
    await supertest(app).post("/signup").send(validUser)
    const authenticate = await supertest(app).post("/signin").send(validUser)
    token.authorization = `Bearer ${authenticate.body.token}`
  })

  it("should create a product", async () => {
    const companies = await supertest(app).post("/companies").set(token).send({
      name: "Test Company",
      cnpj: "16.508.522/0001-39",
    })

    const { body } = await supertest(app).post(`/companies/${companies.body.uid}/products`).set(token).send(product)

    expect(body.uid).toBeDefined()
    expect(body.name).toBe(product.name)
    expect(body.description).toBe(product.description)
    expect(body.variants[0].images).toEqual(product.variants[0].images)
  })
})
