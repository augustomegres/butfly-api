import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory";
import { IUserRepository } from "@app/contracts/repositories/IUserRepository";
import { AppError } from "@infra/shared/errors/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET as string;

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

    const token = jwt.sign({ id: user.id, uid: user.uid }, secret, {
      expiresIn: "1d",
    });
    return { token };
  }
}
