import { CreateCustomerUseCase } from "@src/app/useCases/CreateCustomer";
import { MemoryRepositoryFactory } from "@src/factories/repositories/MemoryRepositoryFactory";
import { v4 } from "uuid";

const repositoryFactory = new MemoryRepositoryFactory();
const createCustomerUseCase = new CreateCustomerUseCase(repositoryFactory);

describe("CreateCustomer", () => {
  const validCustomer = {
    name: "John Doe",
    surname: "Doe",
    observations: "any",
    emails: ["any@mail.com"],
    phones: ["11999999999"],
    addresses: [
      {
        uid: v4(),
        city: "any city",
        street: "any street",
        number: "any number",
        neighborhood: "any neighborhood",
        state: "MG",
        zipCode: "36773-000",
        complement: "",
      },
    ],
  };

  it("should be possible to create a customer", async () => {
    await expect(
      createCustomerUseCase.execute({
        data: validCustomer,
        companyUid: v4(),
        userUid: v4(),
      })
    ).resolves.toBeDefined();
  });

  it("should be possible to create a customer if address is not provided", async () => {
    await expect(
      createCustomerUseCase.execute({
        data: {
          ...validCustomer,
          addresses: undefined,
        },

        companyUid: v4(),
        userUid: v4(),
      })
    ).resolves.toBeDefined();
  });

  it("should be possible to create a customer if phones is not provided", async () => {
    await expect(
      createCustomerUseCase.execute({
        data: {
          ...validCustomer,
          phones: undefined,
        },
        companyUid: v4(),
        userUid: v4(),
      })
    ).resolves.toBeDefined();
  });

  it("should be possible to create a customer if emails is not provided", async () => {
    await expect(
      createCustomerUseCase.execute({
        data: {
          ...validCustomer,
          emails: undefined,
        },
        companyUid: v4(),
        userUid: v4(),
      })
    ).resolves.toBeDefined();
  });
});
