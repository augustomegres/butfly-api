import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer";
import { CreateProductUseCase } from "@app/useCases/CreateProduct";
import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { GetCustomerUseCase } from "@app/useCases/GetCustomer";
import { GetCustomersUseCase } from "@app/useCases/GetCustomers";
import { GetUserCompanies } from "@app/useCases/GetUserCompanies";
import { MeUseCase } from "@app/useCases/Me";
import { PrismaRepositoryFactory } from "@app/factories/PrismaRepositoryFactory";
import { CreateCustomerController } from "@infra/http/controllers/CreateCustomerController";
import { CreateProductController } from "@infra/http/controllers/CreateProductController";
import { CreateUserController } from "@infra/http/controllers/CreateUserController";
import { GetCustomerController } from "@infra/http/controllers/GetCustomerController";
import { GetCustomersController } from "@infra/http/controllers/GetCustomersController";
import { GetUserCompaniesController } from "@infra/http/controllers/GetUserCompaniesController";
import { MeController } from "@infra/http/controllers/MeController";
import { AuthMiddleware } from "@infra/http/middlewares/authMiddleware";
import { CompanyMiddleware } from "@infra/http/middlewares/companyMiddleware";
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany";
import { AuthenticateUserController } from "@infra/http/controllers/AuthenticateUserController";
import { CreateCompanyController } from "@infra/http/controllers/CreateCompanyController";
import { CreateCustomerEmailUseCase } from "@app/useCases/CreateCustomerEmail";
import { CreateCustomerEmailController } from "@http/controllers/CreateCustomerEmailController";
import { CreateCustomerPhoneController } from "@http/controllers/CreateCustomerPhoneController";
import { CreateCustomerPhoneUseCase } from "@app/useCases/CreateCustomerPhone";

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
const createCustomerController = new CreateCustomerController(createCustomerUseCase);

const createCustomerEmailUseCase = new CreateCustomerEmailUseCase(repositoryFactory)
const createCustomerEmailController = new CreateCustomerEmailController(createCustomerEmailUseCase)

const createCustomerPhoneUseCase = new CreateCustomerPhoneUseCase(repositoryFactory)
const createCustomerPhoneController = new CreateCustomerPhoneController(createCustomerPhoneUseCase)

const createProductUseCase = new CreateProductUseCase(repositoryFactory);
const createProductController = new CreateProductController(createProductUseCase);

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
  createCustomerEmailController,
  createCustomerPhoneController,
  getUserCompaniesController
};
