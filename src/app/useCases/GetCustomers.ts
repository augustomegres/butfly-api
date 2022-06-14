import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory";
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository";
import { QueryParamOperators } from "@src/@types/QueryParamTypes";

export class GetCustomersUseCase {
  customerRepository: ICustomerRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }
  async execute({ sortBy, filter, include, page, perPage, search }: {
    page: number
    perPage: number
    sortBy?: { [field: string]: 'asc' | 'desc' }
    filter?: [string, QueryParamOperators, string][]
    include?: 'emails' | 'phones' | 'addresses'[]
    search?: string
  }) {
    const customers = await this.customerRepository.findAll({ page, perPage, include, filter, sortBy, search });
    return customers
  }
}