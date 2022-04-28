import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { UserRepository } from "@repositories/Prisma/UserRepository";
import { ICompanyRepository } from "@repositories/Interfaces/ICompanyRepository";

export class PrismaRepositoryFactory implements IRepositoryFactory {
  createCompanyRepository(): ICompanyRepository {
    throw new Error("Method not implemented.");
  }

  createUserRepository(): IUserRepository {
    return new UserRepository();
  }
}
