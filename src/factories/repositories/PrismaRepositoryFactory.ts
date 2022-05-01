import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { UserRepository } from "@repositories/Prisma/UserRepository";
import { ICompanyRepository } from "@repositories/Interfaces/ICompanyRepository";
import { CompanyRepository } from "@src/repositories/Prisma/CompanyRepository";
import { ICustomerRepository } from "@src/repositories/Interfaces/ICustomerRepository";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
export class PrismaRepositoryFactory implements IRepositoryFactory {
  createUserRepository(): IUserRepository {
    return new UserRepository(prismaClient);
  }
  createCompanyRepository(): ICompanyRepository {
    return new CompanyRepository(prismaClient);
  }
  createCustomerRepository(): ICustomerRepository {
    throw new Error("Method not implemented.");
  }
}
