import { PrismaClient } from "@prisma/client";
import { Company } from "@src/entities/Company";
import { ICompanyRepository } from "../Interfaces/ICompanyRepository";

const prisma = new PrismaClient();

export class CompanyRepository implements ICompanyRepository {
  async create(data: Company, userUid: string): Promise<Company> {
    await prisma.company.create({
      data: {
        uid: data.uid,
        name: data.name,
        cnpj: data.cnpj,
        addresses: { create: [...data.addresses] },
        emails: { create: [...data.emails] },
        phones: { create: [...data.phones] },
        companyUsers: { create: { users: { connect: { uid: userUid } } } },
      },
    });

    return data;
  }
}
