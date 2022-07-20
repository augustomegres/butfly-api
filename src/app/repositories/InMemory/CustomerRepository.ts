import { Customer } from "@src/domain/entities/Customer"
import {
  CreateAddressProps,
  CreateEmailProps,
  CreatePhoneProps,
  ICustomerRepository,
  ListCustomers,
} from "@app/contracts/repositories/ICustomerRepository"
import { QueryParamOperators } from "@src/@types/QueryParamTypes"
import { Address } from "@entities/Address"

export class CustomerRepository implements ICustomerRepository {
  customers: Customer[]
  constructor(customers: Customer[]) {
    this.customers = customers
  }

  async findOne(uid: string): Promise<Customer | null> {
    return this.customers.find((customer) => customer.uid === uid) || null
  }

  async findAll({
    filter,
    sortBy,
    page,
    perPage,
  }: {
    filter?: [string, QueryParamOperators, string][]
    sortBy?: { [field: string]: "asc" | "desc" }
    page: number
    perPage?: number
    count: number
  }): Promise<ListCustomers> {
    return {
      rows: this.customers,
      page: page,
      count: this.customers.length,
      totalPages: perPage ? Math.ceil(this.customers.length / perPage) : 1,
    }
  }

  async findByEmail(searchEmail: string): Promise<any> {
    const customers = await this.customers.filter((customer) => customer.emails.length > 0)
    const customer = customers.find((customer) => {
      const customerIsValid = customer.emails.find((email) => {
        if (email.email === searchEmail) return customer
      })
      if (customerIsValid) return true
    })
    return customer
  }

  async create({ data }: { data: Customer }): Promise<Customer> {
    this.customers.push(data)
    return data
  }

  async createEmail(email: CreateEmailProps, customerUid: string): Promise<void> {
    this.customers.map((customer) => {
      if (customer.uid === customerUid) {
        customer.emails.push({ email: email.email, uid: email.uid })
      }
    })
  }

  async createPhone(phone: CreatePhoneProps, customerUid: string): Promise<void> {
    this.customers.map((customer) => {
      if (customer.uid === customerUid) {
        customer.phones.push({ uid: phone.uid, phone: phone.phone })
      }
    })
  }

  async deletePhone(phoneUid: string): Promise<void> {
    this.customers.map((customer) => (customer.phones = customer.phones.filter((phone) => phone.uid !== phoneUid)))
  }

  async createAddress(address: CreateAddressProps, customerUid: string): Promise<void> {
    this.customers.map((customer) => {
      if (customer.uid === customerUid) {
        customer.addresses.push(address)
      }
    })
  }

  async deleteAddress(addressUid: string): Promise<void> {
    this.customers.map((customer) => (customer.addresses = customer.addresses.filter((address) => address.uid !== addressUid)))
  }

  async updateAddress(addressUid: string, addressData: Partial<Address>): Promise<void> {
    this.customers.map((customer) => {
      customer.addresses.map((address) => {
        if (address.uid === addressUid) {
          address = { ...address, ...addressData }
        }
      })
    })
  }
}
