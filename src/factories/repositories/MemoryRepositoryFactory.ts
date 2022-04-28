import { IRepositoryFactory } from "../interfaces/IRepositoryFactory";

import { UserRepository } from "@repositories/InMemory/UserRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";

import { CompanyRepository } from "@src/repositories/InMemory/CompanyRepository";
import { ICompanyRepository } from "@src/repositories/Interfaces/ICompanyRepository";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  memoryRepository = {
    users: [],
    companies: [],
  };

  createUserRepository(): IUserRepository {
    return new UserRepository(this.memoryRepository.users);
  }

  createCompanyRepository(): ICompanyRepository {
    return new CompanyRepository(this.memoryRepository.companies);
  }
}
