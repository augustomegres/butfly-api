import { Address } from "@src/entities/Address";

export interface ICustomerRepository {
  create({
    data,
    companyUid,
    userUid,
  }: {
    data: Customer;
    companyUid: string | number;
    userUid: string | number;
  }): Promise<Customer>;
}
