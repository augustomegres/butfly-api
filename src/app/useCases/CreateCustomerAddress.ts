import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory"
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { Address } from "@entities/Address"
import { AppError } from "@infra/shared/errors/AppError"
import { v4 } from "uuid"

interface AddressProps {
  city: string
  neighborhood: string
  number: string
  state: string
  street: string
  zipCode: string
  complement?: string
}

export class CreateCustomerAddressUseCase {
  customerRepository: ICustomerRepository
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute(address: AddressProps, customerUid: string) {
    const addressEntity = new Address({ uid: v4(), ...address })
    const customer = await this.customerRepository.findOne(customerUid)
    if (!customer) throw new AppError("Customer not found", 404)
    await this.customerRepository.createAddress(addressEntity, customerUid)
  }
}
