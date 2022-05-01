import { PrismaClient } from "@prisma/client";
import { Company } from "@src/entities/Company";
import { ICompanyRepository } from "@repositories/Interfaces/ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
  }

  async create(data: Company, userUid: string): Promise<Company> {
    const addresses = data.addresses || [];
    const emails = data.emails || [];
    const phones = data.phones || [];
    await this.database.company.create({
      data: {
        uid: data.uid,
        name: data.name,
        cnpj: data.cnpj,
        addresses: { create: [...addresses] },
        emails: { create: [...emails] },
        phones: { create: [...phones] },
        companyUsers: { create: { users: { connect: { uid: userUid } } } },
      },
    });

    return data;
  }
}
