import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";

import { UserRepository } from "@repositories/InMemory/UserRepository";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";

import { CompanyRepository } from "@src/repositories/InMemory/CompanyRepository";
import { ICompanyRepository } from "@src/repositories/Interfaces/ICompanyRepository";

import { CustomerRepository } from "@src/repositories/InMemory/CustomerRepository";
import { ICustomerRepository } from "@src/repositories/Interfaces/ICustomerRepository";

import { User } from "@entities/User";
import { Company } from "@entities/Company";
import { Customer } from "@entities/Customer";
import { Product } from "@entities/Product";
import { ProductRepository } from "@repositories/InMemory/ProductRepository";

export class MemoryRepositoryFactory implements IRepositoryFactory {
  memoryRepository: {
    users: User[];
    companies: Company[];
    companyUsers: { userUid: string; companyUid: string }[];
    customers: Customer[];
    products: Product[];
  } = {
    users: [],
    companies: [],
    companyUsers: [],
    customers: [],
    products: [],
  };

  createUserRepository(): IUserRepository {
    return new UserRepository(
      this.memoryRepository.users,
      this.memoryRepository.companyUsers,
      this.memoryRepository.companies
    );
  }

  createCompanyRepository(): ICompanyRepository {
    return new CompanyRepository(
      this.memoryRepository.companies,
      this.memoryRepository.companyUsers
    );
  }

  createCustomerRepository(): ICustomerRepository {
    return new CustomerRepository(this.memoryRepository.customers);
  }

  createProductRepository() {
    return new ProductRepository(this.memoryRepository.products);
  }
}
