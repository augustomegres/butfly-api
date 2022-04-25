import { IRepositoryFactory } from "@src/factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@src/repositories/Interfaces/IUserRepository";
import { AppError } from "@src/shared/errors/AppError";
import bcrypt from "bcrypt";

export class AuthenticateUserUseCase {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError("User not found.", 404);
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) throw new AppError("Invalid password.", 401);
    return { token: "token" };
  }
}
