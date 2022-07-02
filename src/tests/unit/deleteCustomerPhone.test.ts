import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory"
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { CreateCustomerPhoneUseCase } from "@app/useCases/CreateCustomerPhone"
import { DeleteCustomerPhoneUseCase } from "@app/useCases/DeleteCustomerPhone"

const repositoryFactory = new MemoryRepositoryFactory()
const createCustomer = new CreateCustomerUseCase(repositoryFactory)
const createCustomerPhone = new CreateCustomerPhoneUseCase(repositoryFactory)
const deleteCustomerPhone = new DeleteCustomerPhoneUseCase(repositoryFactory)

describe("DeleteCustomerPhone", () => {
  test("should be possible do delete a customer phone", async () => {
    const newCustomer = await createCustomer.execute({ companyUid: "uid", data: { name: "Customer name", phones: [] } })
    const customerPhone = await createCustomerPhone.execute("32912345678", newCustomer.uid)
    await expect(deleteCustomerPhone.execute(customerPhone.uid, newCustomer.uid, "uid")).resolves.toBeUndefined()
    const customer = await repositoryFactory.memoryRepository.customers.find((customer) => customer.uid === newCustomer.uid)
    expect(customer?.phones.length).toBe(0)
  })

  test("should throw an error if the customer phone uid is not provided", async () => {
    await expect(deleteCustomerPhone.execute("", "customerUid", "companyUid")).rejects.toThrow("Phone uid must be provided")
  })

  test("should throw an error if the customer uid is not provided", async () => {
    await expect(deleteCustomerPhone.execute("phoneUid", "", "")).rejects.toThrow("Customer uid must be provided")
  })

  test("should throw an error if customer not exists", async () => {
    await expect(deleteCustomerPhone.execute("phoneUid", "customerUid", "companyUid")).rejects.toThrow("Customer not exists")
  })

  test("should throw an error if customer does not belong to the provided company", async () => {
    const newCustomer = await createCustomer.execute({ companyUid: "uid", data: { name: "Customer name", phones: [] } })
    await expect(deleteCustomerPhone.execute("phoneUid", newCustomer.uid, "companyUid")).rejects.toThrow(
      "Customer does not belong to the provided company"
    )
  })

  test("should throw an error if the customer phone not exists", async () => {
    const newCustomer = await createCustomer.execute({ companyUid: "uid", data: { name: "Customer name", phones: [] } })
    await expect(deleteCustomerPhone.execute("phoneUid", newCustomer.uid, "uid")).rejects.toThrow("Phone not exists")
  })
})
