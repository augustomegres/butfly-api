import { Company } from "@src/entities/Company";
import { ICompanyRepository } from "../Interfaces/ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  companies: Company[] = [];
  constructor(companies: Company[] = []) {
    this.companies = companies;
  }

  async create(data: Company): Promise<Company> {
    this.companies.push(data);
    return data;
  }
}
