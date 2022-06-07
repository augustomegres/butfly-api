import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer";
import { CreateProductUseCase } from "@app/useCases/CreateProduct";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { GetCustomerUseCase } from "@app/useCases/GetCustomer";
import { GetCustomersUseCase } from "@app/useCases/GetCustomers";
import { GetUserCompanies } from "@app/useCases/GetUserCompanies";
import { MeUseCase } from "@app/useCases/Me";
import { PrismaRepositoryFactory } from "@factories/repositories/PrismaRepositoryFactory";
import { CreateCustomerController } from "@http/controllers/CreateCustomerController";
import { CreateProductController } from "@http/controllers/CreateProductController";
import { CreateUserController } from "@http/controllers/CreateUserController";
import { GetCustomerController } from "@http/controllers/GetCustomerController";
import { GetCustomersController } from "@http/controllers/GetCustomersController";
import { GetUserCompaniesController } from "@http/controllers/GetUserCompaniesController";
import { MeController } from "@http/controllers/MeController";
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

const meUseCase = new MeUseCase(repositoryFactory);
const meController = new MeController(meUseCase);

const getUserCompanies = new GetUserCompanies(repositoryFactory);
const getUserCompaniesController = new GetUserCompaniesController(
  getUserCompanies
);

const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);
const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
);

const getCustomerUseCase = new GetCustomerUseCase(repositoryFactory)
const getCustomerController = new GetCustomerController(getCustomerUseCase)

const getCustomersUseCase = new GetCustomersUseCase(repositoryFactory)
const getCustomersController = new GetCustomersController(getCustomersUseCase)

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
  meController,
  companyMiddleware,
  createUserController,
  authenticateUserController,
  createCompanyController,
  getCustomerController,
  getCustomersController,
  createCustomerController,
  createProductController,
  getUserCompaniesController,
};
