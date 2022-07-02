import { AppError } from "@infra/shared/errors/AppError"
import { validatePhone } from "validations-br"

export class Phone {
  value: string

  constructor(phone: string) {
    this.validate(phone)
    this.value = phone.replace(/\D/g, "")
  }

  validate(phone: string) {
    if (!validatePhone(phone)) {
      throw new AppError("Phone is invalid.")
    }
  }
}
