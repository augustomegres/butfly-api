import { Address } from "@src/domain/entities/Address"
import { Email } from "@src/domain/entities/Email"
import { Phone } from "@src/domain/entities/Phone"
import { Cnpj } from "@src/domain/entities/Cnpj"
import { Company } from "@src/domain/entities/Company"

export interface ICompanyRepository {
  create(data: Company, userId: string | number): Promise<Company>
}
