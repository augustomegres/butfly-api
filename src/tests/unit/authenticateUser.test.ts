import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { CreateUserUseCase } from "@src/app/useCases/CreateUser";
import { MemoryRepositoryFactory } from "@src/factories/repositories/MemoryRepositoryFactory";

const memoryRepositoryFactory = new MemoryRepositoryFactory();

const createUserUseCase = new CreateUserUseCase(memoryRepositoryFactory);
const authenticateUserUseCase = new AuthenticateUserUseCase(
  memoryRepositoryFactory
);

const validUser = {
  name: "John Doe",
  email: "any@mail.com",
  password: "12345678",
};

describe("AuthenticateUser", () => {
  beforeAll(async () => {
    await createUserUseCase.execute(validUser);
  });
  it("should authenticate an user", async () => {
    const { token } = await authenticateUserUseCase.execute({
      email: "any@mail.com",
      password: "12345678",
    });
    expect(token).toBeDefined();
  });

  it("should throw an error if the user is not found", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "anywrong@mail.com",
        password: "123456789",
      })
    ).rejects.toThrow("User not found");
  });

  it("should throw an error if password is invalid", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "any@mail.com",
        password: "123456789",
      })
    ).rejects.toThrow("Invalid password");
  });
});
