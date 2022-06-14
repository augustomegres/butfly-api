import { Address } from "@src/domain/entities/Address";

type ListCustomers = { rows: Customer[]; page: number; totalPages: number, count: number }


export interface ICustomerRepository {
  findOne(uid: string): Promise<Customer | undefined | null>;
  findByEmail(email: string): Promise<Customer | undefined | null>
  findAll({ filter, sortBy, page = 1, perPage = 25, }: {
    filter?: [string, QueryParamOperators, string][];
    sortBy?: { [field: string]: 'asc' | 'desc' };
    include?: 'emails' | 'phones' | 'addresses'[];
    page: number;
    perPage?: number;
    search?: string
  }): Promise<ListCustomers>;
  create({ data, companyUid, }: { data: Customer; companyUid: string | number; }): Promise<Customer>;
  createEmail(email: { uid: string, email: string }, customerUid: string): Promise<void>;
}
