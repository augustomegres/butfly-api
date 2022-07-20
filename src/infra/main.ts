import { PrismaRepositoryFactory } from "@app/factories/PrismaRepositoryFactory"
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { CreateCustomerAddressUseCase } from "@app/useCases/CreateCustomerAddress"
import { CreateCustomerEmailUseCase } from "@app/useCases/CreateCustomerEmail"
import { CreateCustomerPhoneUseCase } from "@app/useCases/CreateCustomerPhone"
import { CreateProductUseCase } from "@app/useCases/CreateProduct"
import { CreateUserUseCase } from "@app/useCases/CreateUser"
import { DeleteCustomerAddressUseCase } from "@app/useCases/DeleteCustomerAddress"
import { DeleteCustomerPhoneUseCase } from "@app/useCases/DeleteCustomerPhone"
import { GetCustomerUseCase } from "@app/useCases/GetCustomer"
import { GetCustomersUseCase } from "@app/useCases/GetCustomers"
import { GetUserCompanies } from "@app/useCases/GetUserCompanies"
import { MeUseCase } from "@app/useCases/Me"
import { UpdateCustomerAddressUseCase } from "@app/useCases/UpdateCustomerAddress"
import { CreateCustomerAddressController } from "@http/controllers/CreateCustomerAddressController"
import { CreateCustomerEmailController } from "@http/controllers/CreateCustomerEmailController"
import { CreateCustomerPhoneController } from "@http/controllers/CreateCustomerPhoneController"
import { DeleteCustomerAddressController } from "@http/controllers/DeleteCustomerAddressController"
import { DeleteCustomerPhoneController } from "@http/controllers/DeleteCustomerPhoneController"
import { UpdateCustomerController } from "@http/controllers/UpdateCustomerController"
import { AuthenticateUserController } from "@infra/http/controllers/AuthenticateUserController"
import { CreateCompanyController } from "@infra/http/controllers/CreateCompanyController"
import { CreateCustomerController } from "@infra/http/controllers/CreateCustomerController"
import { CreateProductController } from "@infra/http/controllers/CreateProductController"
import { CreateUserController } from "@infra/http/controllers/CreateUserController"
import { GetCustomerController } from "@infra/http/controllers/GetCustomerController"
import { GetCustomersController } from "@infra/http/controllers/GetCustomersController"
import { GetUserCompaniesController } from "@infra/http/controllers/GetUserCompaniesController"
import { MeController } from "@infra/http/controllers/MeController"
import { AuthMiddleware } from "@infra/http/middlewares/authMiddleware"
import { CompanyMiddleware } from "@infra/http/middlewares/companyMiddleware"
import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser"
import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany"

const repositoryFactory = new PrismaRepositoryFactory()

const authMiddleware = new AuthMiddleware()
const companyMiddleware = new CompanyMiddleware(repositoryFactory)

const createUserUseCase = new CreateUserUseCase(repositoryFactory)
const createUserController = new CreateUserController(createUserUseCase)

const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryFactory)
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

const meUseCase = new MeUseCase(repositoryFactory)
const meController = new MeController(meUseCase)

const getUserCompanies = new GetUserCompanies(repositoryFactory)
const getUserCompaniesController = new GetUserCompaniesController(getUserCompanies)

const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory)
const createCompanyController = new CreateCompanyController(createCompanyUseCase)

const getCustomerUseCase = new GetCustomerUseCase(repositoryFactory)
const getCustomerController = new GetCustomerController(getCustomerUseCase)

const getCustomersUseCase = new GetCustomersUseCase(repositoryFactory)
const getCustomersController = new GetCustomersController(getCustomersUseCase)

const createCustomerUseCase = new CreateCustomerUseCase(repositoryFactory)
const createCustomerController = new CreateCustomerController(createCustomerUseCase)

const createCustomerEmailUseCase = new CreateCustomerEmailUseCase(repositoryFactory)
const createCustomerEmailController = new CreateCustomerEmailController(createCustomerEmailUseCase)

const createCustomerPhoneUseCase = new CreateCustomerPhoneUseCase(repositoryFactory)
const createCustomerPhoneController = new CreateCustomerPhoneController(createCustomerPhoneUseCase)

const deleteCustomerPhoneUseCase = new DeleteCustomerPhoneUseCase(repositoryFactory)
const deleteCustomerPhoneController = new DeleteCustomerPhoneController(deleteCustomerPhoneUseCase)

const deleteCustomerAddressUseCase = new DeleteCustomerAddressUseCase(repositoryFactory)
const deleteCustomerAddressController = new DeleteCustomerAddressController(deleteCustomerAddressUseCase)

const createCustomerAddressUseCase = new CreateCustomerAddressUseCase(repositoryFactory)
const createCustomerAddressController = new CreateCustomerAddressController(createCustomerAddressUseCase)

const createProductUseCase = new CreateProductUseCase(repositoryFactory)
const createProductController = new CreateProductController(createProductUseCase)

const updateCustomerAddress = new UpdateCustomerAddressUseCase(repositoryFactory)
const updateCustomerAddressController = new UpdateCustomerController(updateCustomerAddress)

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
  deleteCustomerPhoneController,
  deleteCustomerAddressController,
  createCustomerAddressController,
  getUserCompaniesController,
  updateCustomerAddressController,
}
