import { CreateCompanyUseCase } from "@app/useCases/CreateCompany";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { Company } from "@src/domain/entities/Company";
import { User } from "@src/domain/entities/User";
import { CreateCustomerUseCase } from "@src/app/useCases/CreateCustomer";
import { MemoryRepositoryFactory } from "@app/factories/repositories/MemoryRepositoryFactory";
import { v4 } from "uuid";

let user: User;
let company: Company;

const repositoryFactory = new MemoryRepositoryFactory();
const createUserUseCase = new CreateUserUseCase(repositoryFactory);
const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);
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

  beforeAll(async () => {
    user = await createUserUseCase.execute({
      name: "John Doe",
      email: "any@mail.com",
      password: "12345678",
    });

    company = await createCompanyUseCase.execute({ name: "Company" }, user.uid);
  });
  it("should be possible to create a customer", async () => {
    await expect(
      createCustomerUseCase.execute({
        data: validCustomer,
        companyUid: company.uid,
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
        companyUid: company.uid,
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
        companyUid: company.uid,
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
        companyUid: company.uid,
      })
    ).resolves.toBeDefined();
  });
  it("should not be possible to create a customer if name was not provided", async () => {
    await expect(
      createCustomerUseCase.execute({
        data: {
          ...validCustomer,
          name: "",
        },
        companyUid: company.uid,
      })
    ).rejects.toThrow();
  });
});
