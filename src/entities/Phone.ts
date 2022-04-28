import { AppError } from "@src/shared/errors/AppError";
import { validatePhone } from "validations-br";

export class Phone {
  value: string;

  constructor(phone: string) {
    this.validate(phone);
    this.value = phone;
  }

  validate(phone: string) {
    if (!validatePhone(phone)) {
      throw new AppError("Phone is invalid.");
    }
  }
}
