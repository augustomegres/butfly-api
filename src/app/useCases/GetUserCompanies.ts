import { Company } from "@entities/Company";
import { User } from "@entities/User";
import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { AppError } from "@shared/errors/AppError";

export class GetUserCompanies {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(
    userUid: string
  ): Promise<{ user: User; companies: Company[] }> {
    const user = await this.userRepository.findUser(userUid);
    if (!user) throw new AppError("User not found", 404);
    delete user.password;

    const companies = await this.userRepository.findCompanies(userUid);

    return {
      user,
      companies,
    };
  }
}
