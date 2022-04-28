import { AppError } from "@src/shared/errors/AppError";
import { validateCep } from "validations-br";

export class ZipCode {
  value: string;

  constructor(zipCode: string) {
    this.validate(zipCode);
    this.value = zipCode;
  }

  validate(zipCode: string) {
    if (!validateCep(zipCode)) {
      throw new AppError("ZipCode is invalid.");
    }
  }
}
