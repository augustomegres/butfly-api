import { User } from "@entities/User";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { email } });
  }
  async create(data: User): Promise<User> {
    const user = new User(data);
    await prisma.user.create({ data: user });
    return user;
  }
}
