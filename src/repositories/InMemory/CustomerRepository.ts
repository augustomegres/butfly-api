import { Customer } from "@src/entities/Customer";
import { ICustomerRepository } from "../Interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  customers: Customer[];
  constructor(customers: Customer[] = []) {
    this.customers = customers;
  }

  async create({
    data,
    companyUid,
    userUid,
  }: {
    data: Customer;
    companyUid: string | number;
    userUid: string | number;
  }): Promise<Customer> {
    this.customers.push(data);
    return data;
  }
}
