import { CreateCustomerEmailUseCase } from "@app/useCases/CreateCustomerEmail"
import { AppError } from "@infra/shared/errors/AppError"
import { Request, Response } from "express"

export class CreateCustomerEmailController {
  createCustomerEmail: CreateCustomerEmailUseCase
  constructor(createCustomerEmail: CreateCustomerEmailUseCase) {
    this.createCustomerEmail = createCustomerEmail
  }

  async handle(req: Request, res: Response) {
    const { email } = req.body
    const { customerUid } = req.params
    if (!customerUid) throw new AppError("Customer uid is required")
    await this.createCustomerEmail.execute(email, customerUid)
    return res.status(201).send()
  }
}
