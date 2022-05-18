import { CreateCompanyUseCase } from "@app/useCases/CreateCompany";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { GetUserCompanies } from "@app/useCases/GetUserCompanies";
import { MemoryRepositoryFactory } from "@factories/repositories/MemoryRepositoryFactory";

let repositoryFactory: MemoryRepositoryFactory;

let createUserUseCase: CreateUserUseCase;
let createCompanyUseCase: CreateCompanyUseCase;
let getUserCompanies: GetUserCompanies;

let user: any;
let company: any;

describe("GetUserCompanies", () => {
  beforeEach(async () => {
    repositoryFactory = new MemoryRepositoryFactory();
    createUserUseCase = new CreateUserUseCase(repositoryFactory);
    createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);
    getUserCompanies = new GetUserCompanies(repositoryFactory);

    user = await createUserUseCase.execute({
      name: "Valid Name",
      email: "any@mail.com",
      password: "12345678",
    });

    company = await createCompanyUseCase.execute(
      { name: "Valid Name" },
      user.uid
    );
  });

  it("should be possible to get user companies", async () => {
    let { companies } = await getUserCompanies.execute(user.uid);

    expect(companies).toBeDefined();
    expect(companies).toHaveLength(1);
    expect(companies[0].uid).toBe(company.uid);

    await createCompanyUseCase.execute({ name: "Alt Valid Name" }, user.uid);
    const altRequest = await getUserCompanies.execute(user.uid);
    expect(altRequest.companies).toHaveLength(2);
  });

  it("should not be possible to get user companies with an invalid user id", async () => {
    await expect(getUserCompanies.execute("invalid")).rejects.toThrow(
      "User not found"
    );
  });
});
