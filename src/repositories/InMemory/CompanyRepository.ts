import { Company } from "@src/entities/Company";
import { ICompanyRepository } from "@repositories/Interfaces/ICompanyRepository";

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
