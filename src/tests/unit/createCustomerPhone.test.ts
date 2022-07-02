import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory"
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { CreateCustomerPhoneUseCase } from "@app/useCases/CreateCustomerPhone"
const repositoryFactory = new MemoryRepositoryFactory()
const createCustomer = new CreateCustomerUseCase(repositoryFactory)
const createCustomerPhone = new CreateCustomerPhoneUseCase(repositoryFactory)

describe("Create Customer Phone", () => {
  let customer: any

  beforeAll(async () => {
    customer = await createCustomer.execute({ companyUid: "any", data: { name: "John Doe" } })
  })

  it("should create a new customer phone", async () => {
    const customerPhone = await createCustomerPhone.execute("32999999999", customer.uid)
    expect(customerPhone)
    expect(repositoryFactory.memoryRepository.customers[0].phones.length).toBe(1)
    expect(repositoryFactory.memoryRepository.customers[0].phones[0].phone).toBe("32999999999")
  })

  it("should throw an error if customer not found", async () => {
    await expect(createCustomerPhone.execute("32999999999", "uid")).rejects.toThrowError("Customer not found")
  })

  it("should throw an error if phone is not provided", async () => {
    await expect(createCustomerPhone.execute("", "uid")).rejects.toThrowError("Phone must be provided")
  })

  it("should throw an error if phone is invalid", async () => {
    await expect(createCustomerPhone.execute("329999999", customer.uid)).rejects.toThrowError("Phone is invalid")
  })
})
