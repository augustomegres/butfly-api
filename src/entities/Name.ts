import { AppError } from "@shared/errors/AppError";

export class Name {
  value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  validate(value: string) {
    if (value.match(/[^A-zÀ-ú ]/gi))
      throw new AppError("Invalid name provided.");
    if (value.split(" ").length <= 1)
      throw new AppError("You must provide last name.");
  }
}
