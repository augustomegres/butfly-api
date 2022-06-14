import { Company } from "@src/domain/entities/Company";
import { User } from "@src/domain/entities/User";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@app/contracts/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
  }

  async findUser(uid: string): Promise<User | null> {
    const user = await this.database.user.findUnique({
      where: { uid },
      include: { companyUser: true },
    });
    return user;
  }

  async findCompanies(userUid: string): Promise<Company[]> {
    const user = await this.database.user.findUnique({
      where: { uid: userUid },
      include: { companyUser: true },
    });

    const companies = await this.database.company.findMany({
      where: { uid: { in: user?.companyUser.map((companyUser: any) => companyUser.companyUid), }, },
    });

    return companies;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.database.user.findFirst({ where: { email } });
    return user;
  }

  async create(data: User): Promise<User> {
    await this.database.user.create({ data });
    return data;
  }
}
