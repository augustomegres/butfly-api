import { MeUseCase } from "@app/useCases/Me";
import { Request, Response } from "express";

export class MeController {
  constructor(private meUseCase: MeUseCase) {}

  async handle(req: Request, res: Response) {
    const { uid } = req.user;
    const me = await this.meUseCase.execute({ userUid: uid });
    return res.status(200).json(me);
  }
}
