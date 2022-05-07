import { Customer } from "@src/entities/Customer";
import { ICustomerRepository } from "@repositories/Interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  customers: Customer[];
  constructor(customers: Customer[]) {
    this.customers = customers;
  }

  async create({ data }: { data: Customer }): Promise<Customer> {
    this.customers.push(data);
    return data;
  }
}
