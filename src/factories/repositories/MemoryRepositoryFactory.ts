import { IRepositoryFactory } from "../interfaces/IRepositoryFactory";

import { UserRepository } from "@repositories/InMemory/UserRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";

import { CompanyRepository } from "@src/repositories/InMemory/CompanyRepository";
import { ICompanyRepository } from "@src/repositories/Interfaces/ICompanyRepository";

import { CustomerRepository } from "@src/repositories/InMemory/CustomerRepository";
import { ICustomerRepository } from "@src/repositories/Interfaces/ICustomerRepository";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  memoryRepository = {
    users: [],
    companies: [],
    customers: [],
  };
  createUserRepository(): IUserRepository {
    return new UserRepository(this.memoryRepository.users);
  }
  createCompanyRepository(): ICompanyRepository {
    return new CompanyRepository(this.memoryRepository.companies);
  }
  createCustomerRepository(): ICustomerRepository {
    return new CustomerRepository(this.memoryRepository.customers);
  }
}
