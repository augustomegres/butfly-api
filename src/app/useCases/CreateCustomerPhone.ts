import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory";
import { ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository";
import { Phone } from "@entities/Phone";
import { AppError } from "@infra/shared/errors/AppError";
import { v4 } from "uuid";

export class CreateCustomerPhoneUseCase {
  customerRepository: ICustomerRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository();
  }

  async execute(phone: string, customerUid: string) {
    const phoneInstance = new Phone(phone)
    const customer = await this.customerRepository.findOne(customerUid);
    if (!customer) throw new AppError("Customer not found", 404);
    await this.customerRepository.createPhone({ phone: phoneInstance.value, uid: v4() }, customerUid);
  }
}