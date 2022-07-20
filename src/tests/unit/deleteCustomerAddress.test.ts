import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory"
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { DeleteCustomerAddressUseCase } from "@app/useCases/DeleteCustomerAddress"

const memoryRepository = new MemoryRepositoryFactory()
const createCustomer = new CreateCustomerUseCase(memoryRepository)
const deleteCustomerAddress = new DeleteCustomerAddressUseCase(memoryRepository)

describe("DeleteCustomerAddresses", () => {
  test("should be possible to delete a customer address", async () => {
    const customer = await createCustomer.execute({
      data: {
        name: "Customer Name",
        addresses: [{ city: "Any City", neighborhood: "Any Neighborhood", number: "1", state: "MG", street: "Rua Amazonas", zipCode: "36773-119" }],
      },
      companyUid: "uid",
    })

    await expect(deleteCustomerAddress.execute(customer.addresses[0].uid, customer.uid)).resolves.toBeUndefined()
  })

  test("should throw an error if the customer address uid is not provided", async () => {
    const customer = await createCustomer.execute({
      data: {
        name: "Customer Name",
        addresses: [{ city: "Any City", neighborhood: "Any Neighborhood", number: "1", state: "MG", street: "Rua Amazonas", zipCode: "36773-119" }],
      },
      companyUid: "uid",
    })

    await expect(deleteCustomerAddress.execute("", customer.uid)).rejects.toThrow("Address uid must be provided")
  })

  test("should throw an error if the customer address not exists", async () => {
    const customer = await createCustomer.execute({
      data: {
        name: "Customer Name",
        addresses: [],
      },
      companyUid: "uid",
    })

    await expect(deleteCustomerAddress.execute("inexistent", customer.uid)).rejects.toThrow("Address not exists")
  })
})
