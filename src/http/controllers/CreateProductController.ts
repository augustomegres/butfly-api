import { CreateProductUseCase } from "@app/useCases/CreateProduct";
import { Request, Response } from "express";

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, description, variants } = request.body;
    const { companyUid } = request.params;

    const product = await this.createProductUseCase.execute({
      companyUid,
      name,
      description,
      variants,
    });

    return response.status(201).json(product);
  }
}
