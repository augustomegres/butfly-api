import { Company } from "@src/domain/entities/Company";
import { ICompanyRepository } from "@app/contracts/repositories/ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  companies: Company[];
  companyUsers: { userUid: string; companyUid: string }[];
  constructor(
    companies: Company[],
    companyUsers: { userUid: string; companyUid: string }[]
  ) {
    this.companies = companies;
    this.companyUsers = companyUsers;
  }

  async create(data: Company, userUid: string): Promise<Company> {
    this.companies.push(data);
    this.companyUsers.push({ userUid, companyUid: data.uid });
    return data;
  }
}
