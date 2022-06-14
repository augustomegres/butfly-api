import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory";
import { PrismaClient } from "@prisma/client";
import { ICompanyRepository } from "@app/contracts/repositories/ICompanyRepository";
import { IUserRepository } from "@app/contracts/repositories/IUserRepository";
import { CustomerRepository } from "@app/repositories/Prisma/CustomerRepository";
import { ProductRepository } from "@app/repositories/Prisma/ProductRepository";
import { UserRepository } from "@app/repositories/Prisma/UserRepository";
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository";
import { CompanyRepository } from "@app/repositories/Prisma/CompanyRepository";

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
