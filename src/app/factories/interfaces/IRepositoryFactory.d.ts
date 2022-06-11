import { IUserRepository } from "@app/repositories/Interfaces/IUserRepository";
import { ICompanyRepository } from "@app/repositories/Interfaces/ICompanyRepository";
import { ICustomerRepository } from "@app/repositories/Interfaces/ICustomerRepository";

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository;
  createCompanyRepository(): ICompanyRepository;
  createCustomerRepository(): ICustomerRepository;
  createProductRepository(): IProductRepository;
}
