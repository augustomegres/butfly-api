import { DeleteCustomerPhoneUseCase } from "@app/useCases/DeleteCustomerPhone"
import { Request, Response } from "express"

export class DeleteCustomerPhoneController {
  deletePhone: DeleteCustomerPhoneUseCase
  constructor(deletePhoneUseCase: DeleteCustomerPhoneUseCase) {
    this.deletePhone = deletePhoneUseCase
  }

  async handle(req: Request, res: Response) {
    const { phoneUid, customerUid, companyUid } = req.params
    await this.deletePhone.execute(phoneUid, customerUid, companyUid)
    return res.send()
  }
}
