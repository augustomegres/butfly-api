import { CreateAddressProps, CreateEmailProps, CreatePhoneProps, ICustomerRepository } from "@app/contracts/repositories/ICustomerRepository"
import { PrismaClient } from "@prisma/client"
import { QueryParamOperators } from "@src/@types/QueryParamTypes"
import { Customer } from "@src/domain/entities/Customer"
import { includeParamParser } from "./services/IncludeParamsParser"
import { prismaParamParser } from "./services/QueryParamsParser"
import { searchParamParser } from "./services/SearchParamsParser"

export class CustomerRepository implements ICustomerRepository {
  database: PrismaClient

  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase
  }

  async findByEmail(email: string): Promise<Customer | undefined | null> {
    const customer = await this.database.customer.findFirst({
      where: { emails: { some: { email: email } } },
      include: { emails: true },
    })
    return customer as Customer | undefined | null
  }

  async createEmail(email: CreateEmailProps, customerUid: string): Promise<void> {
    await this.database.customerEmail.create({
      data: { email: email.email, customer: { connect: { uid: customerUid } } },
    })
  }

  async createPhone(phone: CreatePhoneProps, customerUid: string): Promise<void> {
    await this.database.customerPhone.create({
      data: { phone: phone.phone, customer: { connect: { uid: customerUid } } },
    })
  }

  async createAddress(address: CreateAddressProps, customerUid: string): Promise<void> {
    await this.database.customerAddress.create({
      data: {
        city: address.city,
        neighborhood: address.neighborhood,
        number: String(address.number),
        state: address.state,
        street: address.street,
        zipCode: address.zipCode,
        complement: address.complement,
        customer: { connect: { uid: customerUid } },
      },
    })
  }

  async findOne(uid: string): Promise<Customer | null> {
    const customer = await this.database.customer.findUnique({
      where: { uid },
      include: { addresses: true, emails: true, phones: true },
    })
    return customer as Customer | null
  }

  async findAll({
    page = 1,
    perPage = 25,
    filter = [],
    sortBy,
    include = [],
    search,
  }: {
    page?: number
    perPage?: number
    sortBy?: { [field: string]: "asc" | "desc" }
    filter?: [string, QueryParamOperators, string][]
    include?: "emails" | "phones" | "addresses"[]
    search?: string
  }): Promise<{ rows: Customer[]; page: number; totalPages: number; count: number }> {
    const prismaParams = prismaParamParser(filter)
    const prismaIncludes = includeParamParser(include as string[])
    const searchParams = searchParamParser(search, ["name", "surname", "observations"])
    const customerTableInfo = await this.database.customer.aggregate({
      _count: true,
      where: { ...prismaParams, ...searchParams },
    })
    const customers = await this.database.customer.findMany({
      where: { ...prismaParams, ...searchParams },
      orderBy: sortBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: prismaIncludes,
    })

    return {
      rows: customers as any[],
      page: page,
      count: customerTableInfo._count,
      totalPages: Math.ceil(customerTableInfo._count / perPage),
    }
  }

  async create({ data, companyUid }: { data: Customer; companyUid: string; userUid: string }): Promise<Customer> {
    await this.database.customer.create({
      data: {
        uid: data.uid,
        companyUid: companyUid,
        name: data.name,
        surname: data.surname,
        observations: data.observations,
        addresses: { create: [...data.addresses] },
        emails: { create: [...data.emails] },
        phones: { create: [...data.phones] },
      },
    })
    return data
  }
}
