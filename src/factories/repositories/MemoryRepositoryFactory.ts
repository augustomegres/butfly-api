import { UserRepository } from "@repositories/InMemory/UserRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { IRepositoryFactory } from "../interfaces/IRepositoryFactory";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  memoryRepository = {
    users: [],
  };
  createUserRepository(): IUserRepository {
    return new UserRepository(this.memoryRepository.users);
  }
}
