import { GetUserCompanies } from "@app/useCases/GetUserCompanies"
import { Request, Response } from "express"

export class GetUserCompaniesController {
  constructor(private getUserCompaniesUseCase: GetUserCompanies) {}

  async handle(req: Request, res: Response) {
    const { uid } = req.user
    const { companies } = await this.getUserCompaniesUseCase.execute(uid)
    res.status(200).send({ companies })
  }
}
