import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory";

import { UserRepository } from "@app/repositories/InMemory/UserRepository";
import { IUserRepository } from "@app/contracts/repositories/IUserRepository";

import { CompanyRepository } from "@app/repositories/InMemory/CompanyRepository";
import { ICompanyRepository } from "@app/contracts/repositories/ICompanyRepository";

import { CustomerRepository } from "@app/repositories/InMemory/CustomerRepository";
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository";

import { User } from "@src/domain/entities/User";
import { Company } from "@src/domain/entities/Company";
import { Customer } from "@src/domain/entities/Customer";
import { Product } from "@src/domain/entities/Product";
import { ProductRepository } from "@app/repositories/InMemory/ProductRepository";

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
