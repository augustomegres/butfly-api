import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany";
import { Request, Response } from "express";

export class CreateCompanyController {
  createCompanyUseCase: CreateCompanyUseCase;
  constructor(createCompanyUseCase: CreateCompanyUseCase) {
    this.createCompanyUseCase = createCompanyUseCase;
  }

  async handle(req: Request, res: Response) {
    const { name, cnpj, addresses, emails, phones } = req.body;
    const company = await this.createCompanyUseCase.execute(
      {
        name,
        cnpj,
        addresses,
        emails,
        phones,
      },
      req.user.uid
    );
    return res.status(201).json(company);
  }
}
