import { Address } from "@src/domain/entities/Address";
import { Company } from "@src/domain/entities/Company";
import { IRepositoryFactory } from "@app/factories/interfaces/IRepositoryFactory";
import { ICompanyRepository } from "@app/repositories/Interfaces/ICompanyRepository";
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

  async execute(
    data: CreateCompanyData,
    userUid: string | number
  ): Promise<Company> {
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

    await this.companyRepository.create(company, userUid);

    return company;
  }
}
