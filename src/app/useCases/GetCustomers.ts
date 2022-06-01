import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { ICustomerRepository } from "@repositories/Interfaces/ICustomerRepository";
import { QueryParamOperators } from "@src/@types/QueryParamTypes";

export class GetCustomersUseCase {
  customerRepository: ICustomerRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }
  async execute({ sortBy, filter, include, page, perPage }: {
    page: number
    perPage: number
    sortBy?: { [field: string]: 'asc' | 'desc' }
    filter?: [string, QueryParamOperators, string][]
    include?: 'emails' | 'phones' | 'addresses'[]
  }) {
    const customers = await this.customerRepository.list({ page, perPage, include, filter, sortBy });
    return customers
  }
}