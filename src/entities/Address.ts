import { ZipCode } from "@entities/ZipCode";
import { AppError } from "@src/shared/errors/AppError";
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
    if (!street) throw new AppError("Street is required");
    if (!number) throw new AppError("Number is required");
    if (!neighborhood) throw new AppError("Neighborhood is required");
    if (!city) throw new AppError("City is required");
    if (!state) throw new AppError("State is required");
    if (!zipCode) throw new AppError("ZipCode is required");
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
