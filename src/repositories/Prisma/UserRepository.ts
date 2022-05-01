import { User } from "@entities/User";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { PrismaClient } from "@prisma/client";
import { Company } from "@entities/Company";
import { AppError } from "@shared/errors/AppError";

export class UserRepository implements IUserRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
  }
  async findCompanies(userUid: string): Promise<Company[]> {
    const user = await this.database.user.findUnique({
      where: { uid: userUid },
      include: { companyUser: true },
    });

    const companies = await this.database.company.findMany({
      where: {
        uid: {
          in: user?.companyUser.map((companyUser) => companyUser.companyUid),
        },
      },
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
