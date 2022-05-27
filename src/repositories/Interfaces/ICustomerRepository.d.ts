import { Address } from "@src/entities/Address";

export interface ICustomerRepository {
  list({
    page = 1,
    perPage = 15,
  }: {
    page: number;
    perPage?: number;
  }): Promise<{
    rows: Customer[];
    page: number;
    totalPages: number;
    count: number;
  }>;
  create({
    data,
    companyUid,
  }: {
    data: Customer;
    companyUid: string | number;
  }): Promise<Customer>;
}
