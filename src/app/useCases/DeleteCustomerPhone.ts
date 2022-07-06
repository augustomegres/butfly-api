import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory"
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { AppError } from "@infra/shared/errors/AppError"

export class DeleteCustomerPhoneUseCase {
  customerRepository: ICustomerRepository
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute(phoneUid: string, customerUid: string) {
    if (!phoneUid) throw new AppError("Phone uid must be provided")
    if (!customerUid) throw new AppError("Customer uid must be provided")
    const customer = await this.customerRepository.findOne(customerUid)
    if (!customer) throw new AppError("Customer not exists")
    const phone = customer.phones.find((phone: { uid: string; phone: string }) => phone.uid === phoneUid)
    if (!phone) throw new AppError("Phone not exists")
    await this.customerRepository.deletePhone(phoneUid)
  }
}
