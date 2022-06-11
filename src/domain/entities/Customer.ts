import { AppError } from "@infra/shared/errors/AppError";
import { Address } from "./Address";
import { Email } from "./Email";
import { Name } from "./Name";
import { Phone } from "./Phone";

export class Customer {
  uid: string;
  companyUid: string;
  name: string;
  surname?: string;
  observations?: string;
  addresses: Address[];
  emails: { uid: string; email: string }[];
  phones: { uid: string; phone: string }[];

  constructor({
    uid,
    companyUid,
    name,
    surname,
    observations,
    addresses = [],
    emails = [],
    phones = [],
  }: {
    uid: string;
    companyUid: string;
    name: string;
    surname?: string;
    observations?: string;
    addresses: Address[];
    phones: { uid: string; phone: string }[];
    emails: { uid: string; email: string }[];
  }) {
    if (!name) throw new AppError("Customer name is required");
    const { value: nameValue } = new Name(name);
    phones?.map((phone) => (phone.phone = new Phone(phone.phone).value));
    emails?.map((email) => (email.email = new Email(email.email).value));

    this.uid = uid;
    this.companyUid = companyUid;
    this.name = nameValue;
    this.addresses = addresses;
    this.surname = surname;
    this.observations = observations;
    this.phones = phones;
    this.emails = emails;
  }
}
