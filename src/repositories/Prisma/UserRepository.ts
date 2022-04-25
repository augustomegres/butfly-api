import { User } from "@entities/User";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
  }
  async create(data: User): Promise<User> {
    await prisma.user.create({ data });
    return data;
  }
}
