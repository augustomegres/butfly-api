import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { PrismaClient } from "@prisma/client";
import { ICompanyRepository } from "@repositories/Interfaces/ICompanyRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { CustomerRepository } from "@repositories/Prisma/CustomerRepository";
import { ProductRepository } from "@repositories/Prisma/ProductRepository";
import { UserRepository } from "@repositories/Prisma/UserRepository";
import { ICustomerRepository } from "@src/repositories/Interfaces/ICustomerRepository";
import { CompanyRepository } from "@src/repositories/Prisma/CompanyRepository";

const prismaClient = new PrismaClient();
export class PrismaRepositoryFactory implements IRepositoryFactory {
  createProductRepository() {
    return new ProductRepository(prismaClient);
  }
  createUserRepository(): IUserRepository {
    return new UserRepository(prismaClient);
  }
  createCompanyRepository(): ICompanyRepository {
    return new CompanyRepository(prismaClient);
  }
  createCustomerRepository(): ICustomerRepository {
    return new CustomerRepository(prismaClient);
  }
}
