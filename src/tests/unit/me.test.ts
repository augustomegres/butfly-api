import { CreateCompanyUseCase } from "@app/useCases/CreateCompany";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { MeUseCase } from "@app/useCases/Me";
import { MemoryRepositoryFactory } from "@app/factories/repositories/MemoryRepositoryFactory";

const repositoryFactory = new MemoryRepositoryFactory();
const meUseCase = new MeUseCase(repositoryFactory);
const createUserUseCase = new CreateUserUseCase(repositoryFactory);
const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);

let user: any;

describe("Me", () => {
  beforeAll(async () => {
    user = await createUserUseCase.execute({
      name: "John Doe",
      email: "any@mail.com",
      password: "12345678",
    });
    await createCompanyUseCase.execute({ name: "Company" }, user.uid);
  });
  it("should return user info", async () => {
    const me = await meUseCase.execute({
      userUid: user.uid,
    });

    expect(me.user.name).toBe("John Doe");
    expect(me.user.email).toBe("any@mail.com");
    expect(me.user.password).toBeUndefined();
  });

  it("should return company info", async () => {
    const me = await meUseCase.execute({
      userUid: user.uid,
    });

    expect(me.companies).toHaveLength(1);
    expect(me.companies[0].name).toBe("Company");
  });

  it("should throw error if user not found", async () => {
    await expect(
      meUseCase.execute({
        userUid: "any-uid",
      })
    ).rejects.toThrowError("User not found");
  });
});
