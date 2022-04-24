import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { User } from "@entities/User";

export class UserRepository implements IUserRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
