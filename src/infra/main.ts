import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { PrismaRepositoryFactory } from "@factories/repositories/PrismaRepositoryFactory";
import { CreateUserController } from "@http/controllers/CreateUserController";
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany";
import { AuthenticateUserController } from "@src/http/controllers/AuthenticateUserController";
import { CreateCompanyController } from "@src/http/controllers/CreateCompanyController";

const repositoryFactory = new PrismaRepositoryFactory();

const createUserUseCase = new CreateUserUseCase(repositoryFactory);
const createUserController = new CreateUserController(createUserUseCase);

const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryFactory);
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);
const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);

export {
  createUserController,
  authenticateUserController,
  createCompanyController,
};
