import { authMiddleware } from "@http/middlewares/authMiddleware";
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { CreateUserUseCase } from "@src/app/useCases/CreateUser";
import { MemoryRepositoryFactory } from "@src/factories/repositories/MemoryRepositoryFactory";
import { NextFunction, Request, Response } from "express";
import { validUser } from "../mocks/users";

const mockResponse: Partial<Response> = { json: jest.fn() };
let nextFunction: NextFunction = jest.fn();

let memoryRepositoryFactory: MemoryRepositoryFactory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

let token: string;

describe("AuthMiddleware", () => {
  beforeAll(async () => {
    memoryRepositoryFactory = new MemoryRepositoryFactory();
    createUserUseCase = new CreateUserUseCase(memoryRepositoryFactory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      memoryRepositoryFactory
    );

    await createUserUseCase.execute(validUser);
    token = await authenticateUserUseCase
      .execute({
        email: validUser.email,
        password: validUser.password,
      })
      .then((data) => data.token);
  });
  it("should throw an error if auth header is invalid", async () => {
    await expect(() =>
      authMiddleware(
        { headers: {} } as Request,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("Missing authorization header");

    expect(nextFunction).toBeCalledTimes(0);
  });

  it("should throw an error if token is invalid", async () => {
    await expect(() =>
      authMiddleware(
        { headers: { authorization: `Bearer invalid` } } as Request,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("Invalid token");

    expect(nextFunction).toBeCalledTimes(0);
  });

  it("should throw call next function when token is valid", async () => {
    authMiddleware(
      { headers: { authorization: `Bearer ${token}` } } as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
  });
});
