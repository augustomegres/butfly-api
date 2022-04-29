import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { UserRepository } from "@repositories/Prisma/UserRepository";
import { ICompanyRepository } from "@repositories/Interfaces/ICompanyRepository";
import { CompanyRepository } from "@src/repositories/Prisma/CompanyRepository";

export class PrismaRepositoryFactory implements IRepositoryFactory {
  createCompanyRepository(): ICompanyRepository {
    return new CompanyRepository();
  }

  createUserRepository(): IUserRepository {
    return new UserRepository();
  }
}
