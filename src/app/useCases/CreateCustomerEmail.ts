import { IRepositoryFactory } from "@app/factories/interfaces/IRepositoryFactory";
import { ICustomerRepository } from "@app/repositories/Interfaces/ICustomerRepository";
import { AppError } from "@infra/shared/errors/AppError";
import { Email } from "@src/domain/entities/Email";
import { v4 } from "uuid";

export class CreateCustomerEmailUseCase {
  customerRepository: ICustomerRepository
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository()
  }

  async execute(email: string, customerUid: string) {
    new Email(email)
    const customer = await this.customerRepository.findOne(customerUid)
    if (!customer) throw new AppError('Customer does not exist')
    const emailIsAlreadyRegistered = await this.customerRepository.findByEmail(email)
    if (emailIsAlreadyRegistered) throw new AppError('Email already registered')
    await this.customerRepository.createEmail({ email, uid: v4() }, customerUid)
  }
}