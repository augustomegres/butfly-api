import { PrismaClient } from "@prisma/client";
import { Customer } from "@src/entities/Customer";
import { ICustomerRepository } from "@repositories/Interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
  }

  async list({
    page,
    perPage = 25,
  }: {
    page: number;
    perPage: number;
  }): Promise<{
    rows: Customer[];
    page: number;
    totalPages: number;
    count: number;
  }> {
    await this.database.customer.findMany({
      where: {
        companyUid: {},
      },
      skip: page * perPage,
      take: perPage,
    });

    return {
      rows: [],
      page: 1,
      totalPages: 1,
      count: 0,
    };
  }

  async create({
    data,
    companyUid,
  }: {
    data: Customer;
    companyUid: string;
    userUid: string;
  }): Promise<Customer> {
    await this.database.customer.create({
      data: {
        uid: data.uid,
        companyUid: companyUid,
        name: data.name,
        surname: data.surname,
        observations: data.observations,
        addresses: { create: [...data.addresses] },
        emails: { create: [...data.emails] },
        phones: { create: [...data.phones] },
      },
    });
    return data;
  }
}
