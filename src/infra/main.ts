import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { PrismaRepositoryFactory } from "@factories/repositories/PrismaRepositoryFactory";
import { CreateUserController } from "@http/controllers/CreateUserController";

const repositoryFactory = new PrismaRepositoryFactory();

const createUserUseCase = new CreateUserUseCase(repositoryFactory);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
