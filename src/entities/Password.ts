import { AppError } from "@shared/errors/AppError";
import bcrypt from "bcryptjs";
export class Password {
  value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = this.encrypt(value);
  }

  validate(value: string) {
    if (value.length < 8)
      throw new AppError("Password must have at least 8 characters.");
  }

  encrypt(value: string): string {
    return bcrypt.hashSync(value, 10);
  }
}
