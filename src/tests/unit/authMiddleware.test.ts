import { AuthMiddleware } from "@http/middlewares/authMiddleware";
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { CreateUserUseCase } from "@src/app/useCases/CreateUser";
import { MemoryRepositoryFactory } from "@src/factories/repositories/MemoryRepositoryFactory";
import { NextFunction, Request, Response } from "express";
import { validUser } from "../mocks/users";

interface RequestProps extends Request {
  headers: { authorization: string };
  params: { companyUid?: string };
}
const mockResponse: Partial<Response> = { json: jest.fn() };
let nextFunction: NextFunction = jest.fn();

let memoryRepositoryFactory: MemoryRepositoryFactory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let authMiddleware: AuthMiddleware;

let token: string;

describe("AuthMiddleware", () => {
  beforeAll(async () => {
    memoryRepositoryFactory = new MemoryRepositoryFactory();
    createUserUseCase = new CreateUserUseCase(memoryRepositoryFactory);
    authMiddleware = new AuthMiddleware();
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
      authMiddleware.handle(
        { headers: {}, params: {} } as RequestProps,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("Missing authorization header");

    expect(nextFunction).toBeCalledTimes(0);
  });

  it("should throw an error if token is invalid", async () => {
    await expect(() =>
      authMiddleware.handle(
        {
          headers: { authorization: `Bearer invalid` },
          params: {},
        } as RequestProps,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("Invalid token");

    expect(nextFunction).toBeCalledTimes(0);
  });

  it("should throw call next function when token is valid", async () => {
    await authMiddleware.handle(
      {
        headers: { authorization: `Bearer ${token}` },
        params: {},
      } as RequestProps,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
  });

  it("should throw an error if user company is not valid", async () => {
    await expect(
      authMiddleware.handle(
        {
          headers: { authorization: `Bearer ${token}` },
          params: { companyUid: "invalid" },
        } as RequestProps,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("User does not have access to this company");
  });
});
