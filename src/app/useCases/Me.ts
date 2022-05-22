import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { AppError } from "@shared/errors/AppError";

export class MeUseCase {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute({ userUid }: { userUid: string }) {
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
