import { PrismaClient } from "@prisma/client";
import { Customer } from "@src/entities/Customer";
import { ICustomerRepository } from "@repositories/Interfaces/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
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
        name: data.uid,
        surname: data.surname,
        observations: data.observations,
        addresses: { create: [...data.addresses] },
        emails: { create: [...data.emails] },
        phones: { create: [...data.phones] },
        companyCustomer: {
          create: { companies: { connect: { uid: companyUid } } },
        },
      },
    });
    return data;
  }
}
