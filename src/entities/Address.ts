import { ZipCode } from "@entities/ZipCode";
import { v4 } from "uuid";

export class Address {
  uid: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    uid = v4(),
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    createdAt,
    updatedAt,
  }: Address) {
    const { value: zipCodeValue } = new ZipCode(zipCode);

    this.uid = uid;
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipCode = zipCodeValue;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
