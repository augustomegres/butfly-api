import { Address } from "@src/entities/Address";
import { Cnpj } from "@src/entities/Cnpj";
import { Company } from "@src/entities/Company";
import { Email } from "@src/entities/Email";
import { Phone } from "@src/entities/Phone";
import { ZipCode } from "@src/entities/ZipCode";
import { IRepositoryFactory } from "@src/factories/interfaces/IRepositoryFactory";
import { ICompanyRepository } from "@src/repositories/Interfaces/ICompanyRepository";
import { v4 } from "uuid";

interface CreateCompanyData {
  name: string;
  cnpj?: string;
  addresses?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  }[];
  phones?: string[];
  emails?: string[];
}

export class CreateCompanyUseCase {
  companyRepository: ICompanyRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.companyRepository = repositoryFactory.createCompanyRepository();
  }

  async execute(data: CreateCompanyData): Promise<Company> {
    const addresses: Address[] = [];
    data.addresses?.forEach((address) => {
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
    data.phones?.forEach((phone) => phones.push({ uid: v4(), phone: phone }));

    const emails: { uid: string; email: string }[] = [];
    data.emails?.forEach((email) => emails.push({ uid: v4(), email: email }));

    const company = new Company({
      uid: v4(),
      name: data.name,
      cnpj: data.cnpj,
      addresses,
      phones,
      emails,
    });

    await this.companyRepository.create(company);

    return company;
  }
}
