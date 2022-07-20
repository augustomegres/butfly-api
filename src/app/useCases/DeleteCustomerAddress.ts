import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory"
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { AppError } from "@infra/shared/errors/AppError"

export class DeleteCustomerAddressUseCase {
  customerRepository: ICustomerRepository
  constructor(memoryRepository: IRepositoryFactory) {
    this.customerRepository = memoryRepository.createCustomerRepository()
  }

  async execute(addressUid: string, customerUid: string): Promise<void> {
    const customer = await this.customerRepository.findOne(customerUid)
    if (!customer) throw new AppError("Customer not exists")
    if (!addressUid) throw new AppError("Address uid must be provided")
    const address = customer.addresses.find((address) => address.uid === addressUid)
    if (!address) throw new AppError("Address not exists")
    await this.customerRepository.deleteAddress(addressUid)
  }
}
