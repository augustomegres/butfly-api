import { Address } from "@src/entities/Address";

export interface ICustomerRepository {
  create({
    data,
    companyUid,
  }: {
    data: Customer;
    companyUid: string | number;
  }): Promise<Customer>;
}
