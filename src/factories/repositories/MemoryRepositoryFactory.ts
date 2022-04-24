import { UserRepository } from "@repositories/InMemory/UserRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { IRepositoryFactory } from "../interfaces/IRepositoryFactory";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  createUserRepository(): IUserRepository {
    return new UserRepository();
  }
}
