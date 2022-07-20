import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory"
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { UpdateCustomerAddressUseCase } from "@app/useCases/UpdateCustomerAddress"
import supertest from "supertest"

let repositoryFactory: MemoryRepositoryFactory
let createCustomer: CreateCustomerUseCase
let updateCustomerAddress: UpdateCustomerAddressUseCase
let customer: { uid: string; addresses: { uid: string }[] }

describe("Update customer address", () => {
  beforeAll(async () => {
    repositoryFactory = new MemoryRepositoryFactory()
    createCustomer = new CreateCustomerUseCase(repositoryFactory)
    updateCustomerAddress = new UpdateCustomerAddressUseCase(repositoryFactory)
    customer = await createCustomer.execute({
      companyUid: "uid",
      data: {
        name: "Customer name",
        addresses: [{ city: "Any", neighborhood: "Any", number: "any", state: "MG", street: "any", zipCode: "12345-678" }],
      },
    })
  })
  test(`should be possible to update an address`, async () => {
    await expect(updateCustomerAddress.execute(customer.uid, customer.addresses[0].uid, {})).resolves.toBeDefined()
  })

  test(`should thrown an error if address not exists on customer`, async () => {
    await expect(updateCustomerAddress.execute(customer.uid, "", {})).rejects.toThrow("Address was not found")
  })

  test(`should thrown an error if an address property is invalid`, async () => {
    await expect(
      updateCustomerAddress.execute(customer.uid, customer.addresses[0].uid, {
        street: "",
      })
    ).rejects.toThrow("Street is required")

    await expect(
      updateCustomerAddress.execute(customer.uid, customer.addresses[0].uid, {
        zipCode: "invalid",
      })
    ).rejects.toThrow("ZipCode is invalid")
  })

  test(`should thrown an error if customer is not found`, async () => {
    await expect(updateCustomerAddress.execute("invalid", "any", { street: "alternative" })).rejects.toThrow("Customer was not found")
  })
})
