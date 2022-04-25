import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { PrismaRepositoryFactory } from "@factories/repositories/PrismaRepositoryFactory";
import { CreateUserController } from "@http/controllers/CreateUserController";
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { AuthenticateUserController } from "@src/http/controllers/AuthenticateUserController";

const repositoryFactory = new PrismaRepositoryFactory();

const createUserUseCase = new CreateUserUseCase(repositoryFactory);
const createUserController = new CreateUserController(createUserUseCase);

const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryFactory);
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export { createUserController, authenticateUserController };
