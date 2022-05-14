import { CreateCompanyUseCase } from "@app/useCases/CreateCompany";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { GetUserCompanies } from "@app/useCases/GetUserCompanies";
import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { MemoryRepositoryFactory } from "@factories/repositories/MemoryRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";

let repositoryFactory: MemoryRepositoryFactory;
let userRepository: IUserRepository;

let createUserUseCase: CreateUserUseCase;
let createCompanyUseCase: CreateCompanyUseCase;
let getUserCompanies: GetUserCompanies;

let user: any;

describe("GetUserCompanies", () => {
  beforeEach(async () => {
    repositoryFactory = new MemoryRepositoryFactory();
    userRepository = repositoryFactory.createUserRepository();
    createUserUseCase = new CreateUserUseCase(repositoryFactory);
    createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);
    getUserCompanies = new GetUserCompanies(repositoryFactory);

    user = await createUserUseCase.execute({
      name: "Valid Name",
      email: "any@mail.com",
      password: "12345678",
    });
  });

  test("should be possible to get user companies", async () => {
    const company = await createCompanyUseCase.execute(
      { name: "Valid Name" },
      user.uid
    );

    let companies = await getUserCompanies.execute(user.uid);

    expect(companies).toBeDefined();
    expect(companies).toHaveLength(1);
    expect(companies[0].uid).toBe(company.uid);

    await createCompanyUseCase.execute({ name: "Alt Valid Name" }, user.uid);

    expect(await getUserCompanies.execute(user.uid)).toHaveLength(2);
  });
});