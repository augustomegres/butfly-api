import { Customer } from "@src/entities/Customer";
import { ICustomerRepository } from "@repositories/Interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  customers: Customer[];
  constructor(customers: Customer[]) {
    this.customers = customers;
  }

  async list({}: {}): Promise<{
    rows: Customer[];
    page: number;
    totalPages: number;
    count: number;
  }> {
    return {
      rows: this.customers,
      page: 1,
      totalPages: 1,
      count: this.customers.length,
    };
  }

  async create({ data }: { data: Customer }): Promise<Customer> {
    this.customers.push(data);
    return data;
  }
}
