import { Customer } from "@src/entities/Customer";
import { ICustomerRepository, ListCustomers } from "@repositories/Interfaces/ICustomerRepository";
import { QueryParamOperators } from "@src/@types/QueryParamTypes";

export class CustomerRepository implements ICustomerRepository {
  customers: Customer[];
  constructor(customers: Customer[]) {
    this.customers = customers;
  }


  async list({
    filter,
    sortBy,
    page,
    perPage
  }: {
    filter?: [string, QueryParamOperators, string][];
    sortBy?: { [field: string]: "asc" | "desc"; };
    page: number;
    perPage?: number;
  }): Promise<ListCustomers> {
    return {
      rows: this.customers,
      page: page,
      totalPages: perPage ? Math.ceil(this.customers.length / perPage) : 1
    };
  }

  async create({ data }: { data: Customer }): Promise<Customer> {
    this.customers.push(data);
    return data;
  }
}
