import { CreateCustomerPhoneUseCase } from "@app/useCases/CreateCustomerPhone"
import { Request, Response } from "express"

export class CreateCustomerPhoneController {
  createCustomerPhone: CreateCustomerPhoneUseCase

  constructor(createCustomerPhone: CreateCustomerPhoneUseCase) {
    this.createCustomerPhone = createCustomerPhone
  }

  async handle(req: Request, res: Response) {
    const { customerUid } = req.params
    const { phone } = req.body

    await this.createCustomerPhone.execute(phone, customerUid)

    return res.status(201).send()
  }
}
