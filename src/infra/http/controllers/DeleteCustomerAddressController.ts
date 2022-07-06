import { DeleteCustomerAddressUseCase } from "@app/useCases/DeleteCustomerAddress"
import { Request, Response } from "express"

export class DeleteCustomerAddressController {
  deleteAddress: DeleteCustomerAddressUseCase
  constructor(deleteAddress: DeleteCustomerAddressUseCase) {
    this.deleteAddress = deleteAddress
  }

  async handle(req: Request, res: Response) {
    const { addressUid, customerUid } = req.params
    await this.deleteAddress.execute(addressUid, customerUid)
    return res.send()
  }
}
