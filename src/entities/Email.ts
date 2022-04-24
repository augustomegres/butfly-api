import { AppError } from "@shared/errors/AppError";
import { validateEmail } from "validations-br";

export class Email {
  value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  validate(value: string) {
    if (!validateEmail(value)) {
      throw new AppError("Email is invalid.");
    }
  }
}
