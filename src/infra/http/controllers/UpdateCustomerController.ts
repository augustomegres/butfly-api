import { UpdateCustomerAddressUseCase } from "@app/useCases/UpdateCustomerAddress"
import { Request, Response } from "express"

export class UpdateCustomerController {
  updateCustomerAddress: UpdateCustomerAddressUseCase
  constructor(updateCustomerAddress: UpdateCustomerAddressUseCase) {
    this.updateCustomerAddress = updateCustomerAddress
  }
  async handle(req: Request, res: Response) {
    const { customerUid, addressUid } = req.params
    const { street, number, neighborhood, complement, city, state, zipCode } = req.body
    const address: { [key: string]: string } = { street, number, neighborhood, complement, city, state, zipCode }
    Object.keys(address).forEach((key) => {
      if (address[key] === null || address[key] === undefined) delete address[key]
    })

    const customer = await this.updateCustomerAddress.execute(customerUid, addressUid, address)
    return res.status(200).json(customer)
  }
}
