import { GetCustomerUseCase } from "@app/useCases/GetCustomer";
import { Request, Response } from "express";

export class GetCustomerController {
  getCustomerUseCase: GetCustomerUseCase
  constructor(getCustomerUseCase: GetCustomerUseCase) {
    this.getCustomerUseCase = getCustomerUseCase
  }
  async handle(req: Request, res: Response) {
    const { customerUid, companyUid } = req.params
    const customer = await this.getCustomerUseCase.execute({ customerUid, companyUid })
    return res.status(200).json(customer)
  }
}