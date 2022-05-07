import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@repositories/Interfaces/IUserRepository";
import { AppError } from "@src/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

interface TokenPayload {
  uid: string;
}

export class AuthMiddleware {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = request.headers;
    const { companyUid } = request.params;
    if (!authorization) {
      throw new AppError("Missing authorization header", 401);
    }

    const [, token] = authorization.split(" ");
    try {
      const payload = verify(token, secret) as TokenPayload;
      const user = payload;
      request.user = user;
    } catch (error) {
      throw new AppError("Invalid token", 401);
    }

    if (companyUid) {
      const companies = await this.userRepository.findCompanies(
        request.user.uid
      );
      if (!companies.find((company) => company.uid === companyUid))
        throw new AppError("User does not have access to this company", 401);
    }

    return next();
  }
}
