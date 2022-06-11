import { IUserRepository } from "@app/repositories/Interfaces/IUserRepository";
import { User } from "@src/domain/entities/User";
import { Company } from "@src/domain/entities/Company";

export class UserRepository implements IUserRepository {
  users: User[];
  companyUsers: { userUid: string; companyUid: string }[];
  companies: Company[];
  constructor(
    users: User[],
    companyUsers: { userUid: string; companyUid: string }[],
    companies: Company[]
  ) {
    this.users = users;
    this.companyUsers = companyUsers;
    this.companies = companies;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findUser(uid: string): Promise<User | null> {
    return this.users.find((user) => user.uid === uid) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findCompanies(userUid: string): Promise<Company[]> {
    const companyUsers = this.companyUsers.filter(
      (companyUser) => companyUser.userUid === userUid
    );
    const companies: Company[] = [];
    companyUsers.forEach((companyUser) => {
      const company = this.companies.find(
        (company) => company.uid === companyUser.companyUid
      );
      if (company) companies.push(company);
    });

    return companies;
  }
}
