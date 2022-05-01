import { Address } from "@src/entities/Address";
import { Customer } from "@src/entities/Customer";
import { Phone } from "@src/entities/Phone";
import { IRepositoryFactory } from "@src/factories/interfaces/IRepositoryFactory";
import { ICustomerRepository } from "@src/repositories/Interfaces/ICustomerRepository";
import { v4 } from "uuid";

export interface CreateCustomerData {
  name: string;
  surname?: string;
  emails?: string[];
  phones?: string[];
  addresses?: Address[];
  observations?: string;
}

export class CreateCustomerUseCase {
  customerRepository: ICustomerRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.customerRepository = repositoryFactory.createCustomerRepository();
  }

  async execute({
    data,
    companyUid,
    userUid,
  }: {
    data: CreateCustomerData;
    companyUid: string;
    userUid: string;
  }): Promise<any> {
    const addresses: Address[] = [];
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
      );
    });

    const phones: { uid: string; phone: string }[] = [];
    data.phones?.map((phone) => phones.push({ uid: v4(), phone: phone }));

    const emails: { uid: string; email: string }[] = [];
    data.emails?.map((email) => emails.push({ uid: v4(), email: email }));

    const customerEntity = new Customer({
      uid: v4(),
      name: data.name,
      surname: data.surname,
      observations: data.observations,
      emails,
      phones,
      addresses,
    });

    const customer = await this.customerRepository.create({
      data: customerEntity,
      companyUid: companyUid,
      userUid: userUid,
    });

    return customer;
  }
}
