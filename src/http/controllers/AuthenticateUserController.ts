import { AuthenticateUserUseCase } from "@src/app/useCases/AuthenticateUser";
import { Request, Response } from "express";

export class AuthenticateUserController {
  authenticateUser: AuthenticateUserUseCase;
  constructor(authenticateUser: AuthenticateUserUseCase) {
    this.authenticateUser = authenticateUser;
  }

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const { token } = await this.authenticateUser.execute({ email, password });
    return res.status(200).json({ token });
  }
}
