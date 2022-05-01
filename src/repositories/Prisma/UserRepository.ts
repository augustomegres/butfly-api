import { User } from "@entities/User";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUserRepository {
  database: PrismaClient;
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase;
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
