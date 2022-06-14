import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory";
import bcrypt from "bcryptjs";

const validUser = {
  name: "Valid Name",
  email: "valid@mail.com",
  password: "12345678",
};
let createUserUseCase: CreateUserUseCase;
describe("CreateUser", () => {
  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(new MemoryRepositoryFactory());
  });
  it("should be possible to create an user", async () => {
    const newUser = await createUserUseCase.execute(validUser);
    expect(newUser).toBeDefined();
    expect(newUser.uid).toBeDefined();
    expect(newUser.name).toBe(validUser.name);
    expect(newUser.email).toBe(validUser.email);
  });

  it("should not be possible to create an user with an invalid name", async () => {
    await expect(
      createUserUseCase.execute({ ...validUser, name: "Inv4l1d N4m3" })
    ).rejects.toThrow("Invalid name provided.");
  });

  it("should not be possible to create an user with a incomplete name", async () => {
    await expect(
      createUserUseCase.execute({ ...validUser, name: "First" })
    ).rejects.toThrow("You must provide last name.");
  });

  it("should not be possible to create an user with an invalid email", async () => {
    await expect(
      createUserUseCase.execute({ ...validUser, email: "invalid@mail" })
    ).rejects.toThrow("Email is invalid.");
  });

  it("should not be possible to create an user with an invalid password", async () => {
    await expect(
      createUserUseCase.execute({ ...validUser, password: "1234567" })
    ).rejects.toThrow("Password must have at least 8 characters.");
  });

  it("should hash user password", async () => {
    const newUser = await createUserUseCase.execute(validUser);
    expect(bcrypt.compareSync("12345678", newUser.password)).toBe(true);
    expect(newUser.password).not.toBe(validUser.password);
  });

  it("should not possible to create an user with an email already registered", async () => {
    await createUserUseCase.execute(validUser);
    await expect(createUserUseCase.execute(validUser)).rejects.toThrow(
      "Email already registered."
    );
  });
});
