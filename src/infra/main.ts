import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer";
import { CreateProductUseCase } from "@app/useCases/CreateProduct";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { GetUserCompanies } from "@app/useCases/GetUserCompanies";
import { PrismaRepositoryFactory } from "@factories/repositories/PrismaRepositoryFactory";
import { CreateCustomerController } from "@http/controllers/CreateCustomerController";
import { CreateProductController } from "@http/controllers/CreateProductController";
import { CreateUserController } from "@http/controllers/CreateUserController";
import { GetUserCompaniesController } from "@http/controllers/GetUserCompaniesController";
import { AuthMiddleware } from "@http/middlewares/authMiddleware";
import { CompanyMiddleware } from "@http/middlewares/companyMiddleware";
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany";
import { AuthenticateUserController } from "@src/http/controllers/AuthenticateUserController";
import { CreateCompanyController } from "@src/http/controllers/CreateCompanyController";

const repositoryFactory = new PrismaRepositoryFactory();

const authMiddleware = new AuthMiddleware();
const companyMiddleware = new CompanyMiddleware(repositoryFactory);

const createUserUseCase = new CreateUserUseCase(repositoryFactory);
const createUserController = new CreateUserController(createUserUseCase);

const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryFactory);
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

const getUserCompanies = new GetUserCompanies(repositoryFactory);
const getUserCompaniesController = new GetUserCompaniesController(
  getUserCompanies
);

const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);
const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);

const createCustomerUseCase = new CreateCustomerUseCase(repositoryFactory);
const createCustomerController = new CreateCustomerController(
  createCustomerUseCase
);

const createProductUseCase = new CreateProductUseCase(repositoryFactory);
const createProductController = new CreateProductController(
  createProductUseCase
);

export {
  authMiddleware,
  companyMiddleware,
  createUserController,
  authenticateUserController,
  createCompanyController,
  createCustomerController,
  createProductController,
  getUserCompaniesController,
};
