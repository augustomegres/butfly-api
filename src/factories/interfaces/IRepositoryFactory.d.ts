import { IUserRepository } from "@repositories/Interfaces/IUserRepository";

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository;
  createCompanyRepository(): ICompanyRepository;
}
