import { Company } from "@src/domain/entities/Company";
import { User } from "@src/domain/entities/User";
import { IRepositoryFactory } from "@app/factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@app/repositories/Interfaces/IUserRepository";
import { AppError } from "@infra/shared/errors/AppError";

export class GetUserCompanies {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(
    userUid: string
  ): Promise<{ companies: Company[] }> {
    const user = await this.userRepository.findUser(userUid);
    if (!user) throw new AppError("User not found", 404);
    delete user.password;

    const companies = await this.userRepository.findCompanies(userUid);

    return { companies };
  }
}
