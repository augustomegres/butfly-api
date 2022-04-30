import { Address } from "@entities/Address";
import { Email } from "@entities/Email";
import { Phone } from "@entities/Phone";
import { Cnpj } from "@src/entities/Cnpj";
import { Company } from "@src/entities/Company";

export interface ICompanyRepository {
  create(data: Company, userId: string | number): Promise<Company>;
}
