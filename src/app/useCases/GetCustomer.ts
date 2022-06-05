import { Customer } from "@entities/Customer";
import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { ICustomerRepository } from "@repositories/Interfaces/ICustomerRepository";
import { AppError } from "@shared/errors/AppError";

export class GetCustomerUseCase {
  customerRepository: ICustomerRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository();
  }

  async execute({ customerUid, companyUid }: { customerUid: string, companyUid: string }): Promise<Customer> {
    if (!customerUid) throw new AppError("Customer uid is required.");
    if (!companyUid) throw new AppError("Company uid is required.");
    const customer = await this.customerRepository.findOne(customerUid);
    if (!customer) throw new AppError("Customer not found.", 404);
    if (customer.companyUid !== companyUid) throw new AppError("Customer not found.", 404);
    return customer
  }
}