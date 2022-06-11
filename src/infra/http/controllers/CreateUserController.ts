import { CreateUserUseCase } from "@app/useCases/CreateUser";
import { Request, Response } from "express";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });
    return res.status(201).json({
      uid: user.uid,
      name: user.name,
      email: user.email,
    });
  }
}
