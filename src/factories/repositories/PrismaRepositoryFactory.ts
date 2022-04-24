import { UserRepository } from "@repositories/Prisma/UserRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";

export class PrismaRepositoryFactory implements IRepositoryFactory {
  createUserRepository(): IUserRepository {
    return new UserRepository();
  }
}
