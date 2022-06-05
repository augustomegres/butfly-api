import { CreateCompanyUseCase } from "@app/useCases/CreateCompany";
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { GetCustomerUseCase } from "@app/useCases/GetCustomer";
import { MemoryRepositoryFactory } from "@factories/repositories/MemoryRepositoryFactory";

const repositoryFactory = new MemoryRepositoryFactory()
const getCustomer = new GetCustomerUseCase(repositoryFactory);
const createCustomer = new CreateCustomerUseCase(repositoryFactory);
const createCompany = new CreateCompanyUseCase(repositoryFactory);
const createUser = new CreateUserUseCase(repositoryFactory);

let newCompany: any
let newUser: any

describe("GetCustomer", () => {
  beforeAll(async () => {
    newUser = await createUser.execute({ name: "John Doe", email: "john@mail.com", password: "123456789" });
    newCompany = await createCompany.execute({ name: 'Company 1' }, newUser.uid);
  })
  it("Should return a customer", async () => {
    const newCustomer = await createCustomer.execute({ data: { name: "John Doe" }, companyUid: newCompany.uid });
    const customer = await getCustomer.execute({ customerUid: newCustomer.uid, companyUid: newCompany.uid });
    expect(customer).toBeDefined();
    expect(customer.companyUid).toBe(newCompany.uid)
  })

  it("Should thrown an error if user was not found", async () => {
    await expect(getCustomer.execute({ customerUid: "invalid", companyUid: newCompany.uid })).rejects.toThrow('Customer not found.');
  })

  it("Should thrown an error if customer uid is not provided", async () => {
    // @ts-ignore
    await expect(getCustomer.execute({})).rejects.toThrow('Customer uid is required.');
  })
}) 