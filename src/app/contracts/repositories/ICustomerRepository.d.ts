import { Customer } from "@entities/Customer"
import { Address } from "@src/domain/entities/Address"

type ListCustomers = { rows: Customer[]; page: number; totalPages: number; count: number }

type CreateEmailProps = {
  uid: string
  email: string
}

type CreatePhoneProps = {
  uid: string
  phone: string
}

type CreateAddressProps = {
  uid: string
  city: string
  neighborhood: string
  number: string
  state: string
  street: string
  zipCode: string
  complement?: string | null
}

export interface ICustomerRepository {
  findOne(uid: string): Promise<?Customer>
  findAll({
    filter,
    sortBy,
    page = 1,
    perPage = 25,
  }: {
    filter?: [string, QueryParamOperators, string][]
    sortBy?: { [field: string]: "asc" | "desc" }
    include?: "emails" | "phones" | "addresses"[]
    page: number
    perPage?: number
    search?: string
  }): Promise<ListCustomers>
  findByEmail(email: string): Promise<?Omit<Customer, "addresses", "phones">>
  create({ data, companyUid }: { data: Customer; companyUid: string | number }): Promise<Customer>
  createEmail(email: CreateEmailProps, customerUid: string): Promise<void>
  createPhone(phone: CreatePhoneProps, customerUid: string): Promise<void>
  deletePhone(phoneUid: string): Promise<void>
  createAddress(address: CreateAddressProps, customerUid: string): Promise<void>
  deleteAddress(addressUid: string): Promise<void>
  updateAddress(addressUid: string, addressData: Partial<Address>): Promise<void>
}
