import { Email } from "@entities/Email";
import { Address } from "@entities/Address";
import { Phone } from "@entities/Phone";
import { Cnpj } from "@entities/Cnpj";
import { AppError } from "@src/shared/errors/AppError";

export class Company {
  uid: string;
  name: string;
  cnpj?: string | null;
  addresses?: Address[] | null;
  phones?: { uid: string; phone: string }[] | null;
  emails?: { uid: string; email: string }[] | null;

  constructor({
    uid,
    name,
    cnpj,
    addresses = [],
    phones = [],
    emails = [],
  }: {
    uid: string;
    name: string;
    cnpj?: string;
    addresses: Address[];
    phones: { uid: string; phone: string }[];
    emails: { uid: string; email: string }[];
  }) {
    if (!name) throw new AppError("Company name is required");
    if (name.length < 3) throw new AppError("Company name must be valid");
    if (cnpj) {
      const { value: cnpjValue } = new Cnpj(cnpj);
      this.cnpj = cnpjValue;
    }

    phones.map((phone) => {
      const { value: phoneValue } = new Phone(phone.phone);
      phone.phone = phoneValue;
    });

    emails.map((email) => {
      const { value: emailValue } = new Email(email.email);
      email.email = emailValue;
    });

    this.uid = uid;
    this.name = name;
    this.addresses = addresses;
    this.phones = phones;
    this.emails = emails;
  }
}
