import { CreateCustomerAddressUseCase } from "@app/useCases/CreateCustomerAddress";
import { Request, Response } from "express";

export class CreateCustomerAddressController {
  constructor(private createCustomerAddress: CreateCustomerAddressUseCase) { }
  async handle(req: Request, res: Response) {
    const { city, neighborhood, number, state, street, zipCode, complement } = req.body;
    const { customerUid } = req.params

    await this.createCustomerAddress.execute({
      city,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      complement
    }, customerUid)
    return res.status(201).send()
  }
}