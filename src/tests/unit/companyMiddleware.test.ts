import { CreateCompanyUseCase } from "@app/useCases/CreateCompany"
import { CompanyMiddleware } from "@infra/http/middlewares/companyMiddleware"
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser"
import { CreateUserUseCase } from "@src/app/useCases/CreateUser"
import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory"
import { NextFunction, Request, Response } from "express"
import { validUser } from "../mocks/users"

interface RequestProps extends Request {
  headers: { authorization: string }
  params: { companyUid?: string }
}
const mockResponse: Partial<Response> = { json: vi.fn() }
let nextFunction: NextFunction = vi.fn() as any

let companyMiddleware: CompanyMiddleware
let memoryRepositoryFactory: MemoryRepositoryFactory
let createUserUseCase: CreateUserUseCase
let createCompanyUseCase: CreateCompanyUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

let user: any
let company: any
let token: string

describe("AuthMiddleware", () => {
  beforeAll(async () => {
    memoryRepositoryFactory = new MemoryRepositoryFactory()
    companyMiddleware = new CompanyMiddleware(memoryRepositoryFactory)
    createUserUseCase = new CreateUserUseCase(memoryRepositoryFactory)
    createCompanyUseCase = new CreateCompanyUseCase(memoryRepositoryFactory)
    authenticateUserUseCase = new AuthenticateUserUseCase(memoryRepositoryFactory)

    user = await createUserUseCase.execute(validUser)
    token = await authenticateUserUseCase
      .execute({
        email: validUser.email,
        password: validUser.password,
      })
      .then((data) => data.token)

    company = await createCompanyUseCase.execute(
      {
        name: "test",
      },
      memoryRepositoryFactory.memoryRepository.users[0].uid
    )
  })

  it("should throw an error if company was not found", async () => {
    await expect(() =>
      companyMiddleware.handle(
        {
          headers: {},
          params: { companyUid: "any" },
          user: { uid: user.uid },
        } as RequestProps,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("User does not have access to this company")

    expect(nextFunction).toBeCalledTimes(0)
  })
  it("should throw an error if user was not found", async () => {
    await expect(() =>
      companyMiddleware.handle(
        {
          headers: {},
          params: { companyUid: company.uid },
          user: { uid: "any" },
        } as RequestProps,
        mockResponse as Response,
        nextFunction
      )
    ).rejects.toThrow("User does not have access to this company")

    expect(nextFunction).toBeCalledTimes(0)
  })
  it("should pass if company was found and user have access to this company", async () => {
    await companyMiddleware.handle(
      {
        headers: {},
        params: { companyUid: company.uid },
        user: { uid: user.uid },
      } as RequestProps,
      mockResponse as Response,
      nextFunction
    )

    expect(nextFunction).toBeCalledTimes(1)
  })
})
