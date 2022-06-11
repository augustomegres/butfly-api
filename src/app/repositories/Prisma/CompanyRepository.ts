import { PrismaClient } from "@prisma/client";
import { Company } from "@src/domain/entities/Company";
import { ICompanyRepository } from "@app/repositories/Interfaces/ICompanyRepository";
import { Address } from "@src/domain/entities/Address";

export class CompanyRepository implements ICompanyRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
  }

  async create(data: Company, userUid: string): Promise<Company> {
    const addresses = data.addresses as Address[];
    const emails = data.emails as { uid: string; email: string }[];
    const phones = data.phones as { uid: string; phone: string }[];
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
