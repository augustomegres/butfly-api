import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { Request, Response } from "express"

export class CreateCustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}
  async handle(req: Request, res: Response) {
    const companyUid = req.params.companyUid
    const { name, surname, observations, emails, addresses, phones } = req.body
    const customer = await this.createCustomerUseCase.execute({
      companyUid,
      data: {
        name,
        surname,
        observations,
        addresses,
        phones,
        emails,
      },
    })
    return res.status(201).json(customer)
  }
}
