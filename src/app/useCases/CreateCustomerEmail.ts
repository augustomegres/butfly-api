import { Email } from "@src/domain/entities/Email";

export class CreateCustomerEmail {
  constructor() { }

  async execute(email: string, customerUid: string) {
    const emailInstance = new Email(email)

  }
}