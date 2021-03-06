import { IUserRepository } from "@app/contracts/repositories/IUserRepository"
import { AppError } from "@infra/shared/errors/AppError"
import { Address } from "@src/domain/entities/Address"
import { Customer } from "@src/domain/entities/Customer"
import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory"
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { v4 } from "uuid"

export interface CreateCustomerData {
  name: string
  surname?: string
  emails?: string[]
  phones?: string[]
  addresses?: Omit<Address, "uid">[]
  observations?: string
}

export class CreateCustomerUseCase {
  customerRepository: ICustomerRepository
  userRepository: IUserRepository
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
    this.userRepository = repositoryFactory.createUserRepository()
  }

  async execute({ data, companyUid }: { data: CreateCustomerData; companyUid: string }): Promise<any> {
    const addresses: Address[] = []
    data.addresses?.map((address) => {
      addresses.push(
        new Address({
          uid: v4(),
          street: address.street,
          number: address.number,
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        })
      )
    })

    const phones: { uid: string; phone: string }[] = []
    data.phones?.map((phone) => phones.push({ uid: v4(), phone: phone }))

    const emails: { uid: string; email: string }[] = []
    data.emails?.map((email) => emails.push({ uid: v4(), email: email }))

    const customerEntity = new Customer({
      uid: v4(),
      companyUid: companyUid,
      name: data.name,
      surname: data.surname,
      observations: data.observations,
      emails,
      phones,
      addresses,
    })

    const customer = await this.customerRepository.create({
      companyUid: companyUid,
      data: customerEntity,
    })

    return customer
  }
}
