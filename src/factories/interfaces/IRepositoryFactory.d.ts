import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { ICompanyRepository } from "@src/repositories/Interfaces/ICompanyRepository";
import { ICustomerRepository } from "@src/repositories/Interfaces/ICustomerRepository";

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository;
  createCompanyRepository(): ICompanyRepository;
  createCustomerRepository(): ICustomerRepository;
  createProductRepository(): IProductRepository;
}
