import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory"
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { Address } from "@entities/Address"
import { AppError } from "@infra/shared/errors/AppError"

export class UpdateCustomerAddressUseCase {
  customerRepository: ICustomerRepository
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute(
    customerUid: string,
    addressUid: string,
    addressData: {
      street?: string
      number?: string
      neighborhood?: string
      complement?: string
      city?: string
      state?: string
      zipCode?: string
    }
  ) {
    const customer = await this.customerRepository.findOne(customerUid)
    if (!customer) throw new AppError(`Customer was not found`, 404)
    const oldAddress = customer.addresses.find((address) => address.uid === addressUid)
    if (!oldAddress) throw new AppError("Address was not found", 404)
    const newAddress = new Address({ ...oldAddress, ...addressData })
    await this.customerRepository.updateAddress(addressUid, newAddress)
    return newAddress
  }
}
