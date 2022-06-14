import { IUserRepository } from "@app/repositories/Interfaces/IUserRepository";
import { ICompanyRepository } from "@app/repositories/Interfaces/ICompanyRepository";
import { ICustomerRepository } from "@app/repositories/Interfaces/ICustomerRepository";
import { ICustomerEmailRepository } from "@app/repositories/Interfaces/ICustomerEmailRepository";

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository;
  createCompanyRepository(): ICompanyRepository;
  createCustomerRepository(): ICustomerRepository;
  createProductRepository(): IProductRepository;
}
