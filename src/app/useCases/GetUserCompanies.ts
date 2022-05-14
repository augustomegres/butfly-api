import { Company } from "@entities/Company";
import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";

export class GetUserCompanies {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute(userUid: string): Promise<Company[]> {
    const companies = await this.userRepository.findCompanies(userUid);
    return companies;
  }
}
