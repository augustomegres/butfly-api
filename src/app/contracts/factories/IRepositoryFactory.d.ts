import { IUserRepository } from "@app/contracts/repositories/IUserRepository"
import { ICompanyRepository } from "@app/contracts/repositories/ICompanyRepository"
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { ICustomerEmailRepository } from "@app/repositories/Interfaces/ICustomerEmailRepository"

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository
  createCompanyRepository(): ICompanyRepository
  createCustomerRepository(): ICustomerRepository
  createProductRepository(): IProductRepository
}
