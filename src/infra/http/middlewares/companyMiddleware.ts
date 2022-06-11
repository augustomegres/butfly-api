import { IRepositoryFactory } from "@app/factories/interfaces/IRepositoryFactory";
import { IUserRepository } from "@app/repositories/Interfaces/IUserRepository";
import { AppError } from "@infra/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export class CompanyMiddleware {
  userRepository: IUserRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.userRepository = repositoryFactory.createUserRepository();
  }

  async handle(
    request: Request,
    _: Response,
    next: NextFunction
  ): Promise<void> {
    const { companyUid } = request.params;

    if (companyUid) {
      const companies = await this.userRepository.findCompanies(request.user.uid);
      if (!companies.find((company) => company.uid === companyUid))
        throw new AppError("User does not have access to this company", 401);
    }

    next();
  }
}
