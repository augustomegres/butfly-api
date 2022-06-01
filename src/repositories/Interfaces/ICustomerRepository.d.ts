import { Address } from "@src/entities/Address";

type ListCustomers = { rows: Customer[]; page: number; totalPages: number }


export interface ICustomerRepository {
  list({ filter, sortBy, page = 1, perPage = 25, }: {
    filter?: [string, QueryParamOperators, string][];
    sortBy?: { [field: string]: 'asc' | 'desc' };
    include?: 'emails' | 'phones' | 'addresses'[];
    page: number;
    perPage?: number;
  }): Promise<ListCustomers>;
  create({
    data,
    companyUid,
  }: {
    data: Customer;
    companyUid: string | number;
  }): Promise<Customer>;
}
