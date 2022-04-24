import { User } from "@entities/User";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { AppError } from "@src/shared/errors/AppError";
import { IRepositoryFactory } from "src/factories/interfaces/IRepositoryFactory";
import { v4 } from "uuid";

export class CreateUserUseCase {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const user = new User({ uid: v4(), name, email, password });
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) throw new AppError("Email already registered.");
    await this.userRepository.create(user);
    return user;
  }
}
